import { Response, Request, NextFunction, Handler } from "express";
import { markApiCall } from "@energon/splunk-logger";
import { setColleagueData, getColleagueData } from "./colleague-data";
import { getIdentityData } from "../identity-swap";
import { getColleagueApi, ColleagueField, ColleagueResponse } from "../api";
import {
  getDataFromCookie,
  setDataToCookie,
  PluginCookieConfig,
  clearPluginCookiesIfSessionExpired,
} from "../utils";
import { Optional } from "../plugin";
import { getOpenIdUserInfo } from "../../user-info-extractor";

export type Strategy = "oidc" | "saml";

type Config<O> = {

  /**
   * array of colleague data fields that we are interested in
   */
  fields: ColleagueField[];

  /**
   * optional, if it returns false, code in the plugin won't be executed
   * E.g. check if another cookie exists
   * defaults to ()=>true
   */
  shouldRun?: (request: Request, response: Response) => boolean;

  /**
   * API base url
   * E.g.https://api-ppe.tesco.com
   */
  baseUrl?: string;

  /**
   * Endpoint path
   * E.g. /colleague/colleagues
   */
  path?: string;

  /**
   * optional, cookie configuration object
   * if not present, data won't be saved in the cookie
   */
  cookieConfig?: PluginCookieConfig & {
    /**
     * optional, method that will determine the shape of the data saved in the cookie
     */
    cookieShapeResolver?: (data: ColleagueResponse) => O;
  };
};

/**
 * A plugin middleware to be used in onelogin.
 * It gets the data from the colleauge API relies on identity data in response the object.
 */
export const colleagueApiPlugin = <O>(
  config: Config<O> & Optional,
): Handler => {
  const plugin = async (req: Request, res: Response, next: NextFunction) => {
    const {
      fields,
      shouldRun = () => true,
      baseUrl = process.env.NODE_CONFIG_ENV === "prod"
        ? "https://api.tesco.com"
        : "https://api-ppe.tesco.com",
      path = "/colleague/colleagues",
      cookieConfig,
    } = config;

    if (getColleagueData(res) || !shouldRun(req, res)) return next();

    if (cookieConfig) {
      clearPluginCookiesIfSessionExpired(req, res, cookieConfig);

      const { secret, cookieName, compressed } = cookieConfig;
      const data = getDataFromCookie<ColleagueResponse>(req, {
        cookieName,
        secret,
        compressed,
      });

      if (data) {
        setColleagueData(res, data);
        return next();
      }
    }

    const identityData = getIdentityData(res);
    if (!identityData) throw Error("No identity data found in response object");
    const { access_token: accessToken, claims } = identityData;
    const colleagueUUID = claims.sub;

    if (!accessToken) throw Error("No identity access token found");
    if (!colleagueUUID) throw Error("No colleague UUID found");

    const headerProvider = {
      ["Content-Type"]: () => "application/json",
      Authorization: () => `Bearer ${accessToken}`,
    };

    const colleagueApi = getColleagueApi(
      headerProvider,
      baseUrl,
      path,
      markApiCall(res),
    );
    const { data } = await colleagueApi({
      body: {
        operationName: "Query",
        variables: { colleagueUUID },
        query: `query Query($colleagueUUID: ID!, $date: String) { colleague(identifier: $colleagueUUID, effectiveDate: $date) { ${fields.join(
          " ",
        )} } }`,
      },
    });

    if (cookieConfig) {
      const { cookieShapeResolver = (data: any) => data } = cookieConfig;
      const sid = getOpenIdUserInfo(res)?.sid;
      const payload = { ...cookieShapeResolver(data), sid };

      if (!res.writableEnded) {
        setDataToCookie(res, payload, { ...cookieConfig });
      }
      setColleagueData(res, payload);
    } else {
      setColleagueData(res, data);
    }

    return next();
  };
  plugin.optional = config.optional || false;
  return plugin;
};
