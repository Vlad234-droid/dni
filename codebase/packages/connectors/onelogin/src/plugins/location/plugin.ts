import { Response, Request, NextFunction, Handler } from "express";
import { markApiCall } from "@energon/splunk-logger";
import { getLocationData, setLocationData } from "./location-data";
import { getColleagueData } from "../colleague";
import { getIdentityClientData } from "../identity-cst";
import { getLocationApi, LocationField, LocationResponse } from "../api";
import {
  getDataFromCookie,
  setDataToCookie,
  PluginCookieConfig,
  clearPluginCookiesIfSessionExpired,
} from "../utils";
import { getOpenIdUserInfo } from "../../user-info-extractor";
import { Optional } from "../plugin";

type Config<O> = {
  /**
   * array of location data fields that we are interested in
   */
  fields: LocationField[];
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
   * E.g.  /tescolocation/v4/locations/:locationUUID
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
    cookieShapeResolver?: (data: LocationResponse) => O;
  };
};
/**
 * A plugin middleware to be used in onelogin.
 * It gets the data from the location API. Relies on the colleague data (locationUUID) in response the object.
 */
export const locationApiPlugin = <O>(config: Config<O> & Optional): Handler => {
  const plugin = async (req: Request, res: Response, next: NextFunction) => {
    const {
      fields,
      shouldRun = () => true,
      baseUrl = process.env.NODE_CONFIG_ENV === "prod"
        ? "https://api.tesco.com"
        : "https://api-ppe.tesco.com",
      path = "/tescolocation/v4/locations/:locationUUID",
      cookieConfig,
    } = config;

    if (getLocationData(res) || !shouldRun(req, res)) return next();

    if (cookieConfig) {
      clearPluginCookiesIfSessionExpired(req, res, cookieConfig);

      const { secret, cookieName, compressed } = cookieConfig;
      const data = getDataFromCookie<LocationResponse>(req, {
        cookieName,
        secret,
        compressed,
      });

      if (data) {
        setLocationData(res, data);
        return next();
      }
    }

    const identityData = getIdentityClientData(res);
    if (!identityData)
      throw Error("No identity client data found in response object");
    const { access_token: accessToken } = identityData;

    const colleagueData = getColleagueData(res);
    if (!colleagueData)
      throw Error("No colleague data found in response object");
    const {
      data: {
        colleague: { locationUUID },
      },
    } = colleagueData;

    const headerProvider = {
      ["Content-Type"]: () => "application/json",
      Authorization: () => `Bearer ${accessToken}`,
    };

    const api = getLocationApi(headerProvider, baseUrl, path, markApiCall(res));
    const { data } = await api({
      params: { locationUUID, fields: fields.join(",") },
    });

    if (cookieConfig) {
      const { cookieShapeResolver = (data: any) => data } = cookieConfig;
      const sid = getOpenIdUserInfo(res)?.sid;
      const payload = { ...cookieShapeResolver(data), sid };

      setDataToCookie(res, payload, { ...cookieConfig });

      setLocationData(res, payload);
    } else {
      setLocationData(res, data);
    }

    return next();
  };
  plugin.optional = config.optional || false;
  return plugin;
};
