import { Response, Request, NextFunction, Handler } from "express";
import { markApiCall } from "@energon/splunk-logger";
import {
  setDataToCookie,
  getDataFromCookie,
  PluginCookieConfig,
  getIdentitySwapToken,
  clearCookie,
  getMaxAge,
  clearPluginCookiesIfSessionExpired,
} from "../utils";
import { getIdentityApi, UserScopeToken } from "../api";
import { setIdentityData, getIdentityData } from "./identity-data";
import { getOpenIdUserInfo } from "../../user-info-extractor";
import { Optional } from "../plugin";

export const IDENTITY_COOKIE_NAME = "tesco.identity";
export type Strategy = "oidc" | "saml";

type Config<O> = {
  /**
   * A concatenation of the identity client id and identity secret in the following shape:
   * {identityClientId}:{identityClientSecret}
   */
  identityIdAndSecret: string;
  /**
   * onelogin strategy: oidc or saml
   */
  strategy: Strategy;
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
   * E.v. /identity/v4/token-swap
   */
  path?: string;
  /**
   * optional, cookie configuration object
   * if not present, data won't be saved in the cookie
   * if maxAge is not present, expiration claims will be used instead
   */
  cookieConfig?: PluginCookieConfig & {
    /**
     * optional, method that will determine the shape of the data saved in the cookie
     */
    cookieShapeResolver?: (data: UserScopeToken) => O;
  };
};

const refreshCookieName = (cookieName: string) => `${cookieName}-refresh`;

/**
 * A plugin middleware to be used in onelogin.
 * It swaps the oidc or saml token for the identity access token.
 */
export const identityTokenSwapPlugin = <O>(
  config: Config<O> & Optional,
): Handler => {
  const plugin = async (req: Request, res: Response, next: NextFunction) => {
    const {
      identityIdAndSecret,
      strategy,
      shouldRun = () => true,
      baseUrl = process.env.NODE_CONFIG_ENV === "prod"
        ? "https://api.tesco.com"
        : "https://api-ppe.tesco.com",
      path = "/identity/v4/issue-token/token",
      cookieConfig,
    } = config;

    try {
      if (getIdentityData(res) || !shouldRun(req, res)) return next();

      if (cookieConfig) {
        clearPluginCookiesIfSessionExpired(
          req,
          res,
          {
            ...cookieConfig,
            cookieName: refreshCookieName(cookieConfig.cookieName),
          },
          [cookieConfig],
        );

        const { secret, cookieName, compressed } = cookieConfig;
        const data = getDataFromCookie<UserScopeToken>(req, {
          cookieName,
          secret,
          compressed,
        });

        if (data) {
          setIdentityData(res, data);
          return next();
        }
      }

      const refreshToken = cookieConfig
        ? getDataFromCookie<{ refreshToken: string }>(req, {
            cookieName: refreshCookieName(cookieConfig.cookieName),
            secret: cookieConfig.secret,
            compressed: cookieConfig.compressed,
          })?.refreshToken
        : undefined;

      const credentials = Buffer.from(identityIdAndSecret).toString("base64");

      const headerProvider = {
        Authorization: () => `Basic ${credentials}`,
        Accept: () =>
          "application/vnd.tesco.identity.tokenresponse.v4claims+json",
      };

      const api = getIdentityApi(
        headerProvider,
        baseUrl,
        path,
        markApiCall(res),
      );

      const { data } = await (refreshToken
        ? api.refreshUserToken({
            body: { grant_type: "refresh_token", refresh_token: refreshToken },
          })
        : api.exchangeUserToken({
            body: {
              grant_type: "token_exchange",
              trusted_token: getIdentitySwapToken(res, strategy),
              identity_provider: "onelogin",
              token_type: strategy,
              scope: "internal public",
            },
          }));

      const identityTokenMaxAge = getMaxAge(data.claims);
      const refreshTokenMaxAge = identityTokenMaxAge + 60 * 60 * 1000;

      if (cookieConfig) {
        const { cookieShapeResolver = (data: any) => data } = cookieConfig;
        const sid = getOpenIdUserInfo(res)?.sid;
        const payload = { ...cookieShapeResolver(data), sid };

        setDataToCookie(res, payload, {
          maxAge: identityTokenMaxAge,
          ...cookieConfig,
        });
        setDataToCookie(
          res,
          { refreshToken: data.refresh_token },
          {
            ...cookieConfig,
            cookieName: refreshCookieName(cookieConfig.cookieName),
            maxAge: refreshTokenMaxAge,
          },
        );
        setIdentityData(res, payload);
      } else {
        setIdentityData(res, data);
      }
    } catch (e) {
      if (cookieConfig) {
        clearCookie(res, cookieConfig);
        clearCookie(res, {
          ...cookieConfig,
          cookieName: refreshCookieName(cookieConfig.cookieName),
        });
      }
      throw e;
    }

    return next();
  };
  plugin.optional = config.optional || false;
  return plugin;
};
