import { Response, Request, NextFunction, Handler } from "express";
import { getUserData, setUserData } from "./user-data";
import {
  setDataToCookie,
  getDataFromCookie,
  PluginCookieConfig,
  clearPluginCookiesIfSessionExpired,
} from "../utils";
import { Optional } from "../plugin";
import { OneloginError } from "../..";
import { getOpenIdUserInfo, OpenIdUserInfo } from "../../user-info-extractor";

type Config<O> = {
  /**
   * optional, if it returns false, code in the plugin won't be executed
   * E.g. check if another cookie exists
   * defaults to ()=>true
   */
  shouldRun?: (request: Request, response: Response) => boolean;
  /**
   * optional, cookie configuration object
   * if not present, data won't be saved in the cookie
   * if maxAge is not present, expiration claims will be used instead
   */
  cookieConfig?: PluginCookieConfig & {
    /**
     * optional, method that will determine the shape of the data saved in the cookie
     */
    cookieShapeResolver?: (data: OpenIdUserInfo, response: Response) => O;
  };
};

const handleNoData = (next: NextFunction, optional?: boolean) => {
  if (optional) {
    return next();
  } else {
    throw new OneloginError(
      "plugin",
      "No user info found in response object",
      401,
    );
  }
};

const userDataCookieHandler = <O>(
  req: Request,
  res: Response,
  next: NextFunction,
  config: Config<O> & Optional,
) => {
  const { cookieConfig, optional } = config;
  clearPluginCookiesIfSessionExpired(req, res, cookieConfig!);

  const {
    secret,
    cookieName,
    compressed,
    cookieShapeResolver = (data: any) => data,
  } = cookieConfig!;

  const dataFromCookie = getDataFromCookie<O>(req, {
    cookieName,
    secret,
    compressed,
  });

  if (dataFromCookie) {
    setUserData(res, dataFromCookie);
    return next();
  } else {
    const userInfo = getOpenIdUserInfo(res);
    if (userInfo) {
      const sid = userInfo?.sid;
      const payload = { ...cookieShapeResolver(userInfo, res), sid };

      setDataToCookie(res, payload, {
        ...cookieConfig!,
      });
      setUserData(res, payload);
      return next();
    } else handleNoData(next, optional);
  }
};

const userDataNoCookieHandler = <O>(
  res: Response,
  next: NextFunction,
  config: Config<O> & Optional,
) => {
  const { optional } = config;
  const userInfo = getOpenIdUserInfo(res);
  if (userInfo) {
    setUserData(res, userInfo);
    return next();
  } else {
    handleNoData(next, optional);
  }
};

/**
 * A plugin middleware to be used in onelogin.
 * It swaps the oidc or saml token for the identity access token.
 */
export const userDataPlugin = <O>(config: Config<O> & Optional): Handler => {
  const { shouldRun = () => true, cookieConfig, optional } = config;

  const plugin = (req: Request, res: Response, next: NextFunction) => {
    if (getUserData(res) || !shouldRun(req, res)) return next();

    if (cookieConfig) {
      userDataCookieHandler(req, res, next, config);
    } else {
      userDataNoCookieHandler(res, next, config);
    }
  };
  plugin.optional = optional || false;
  return plugin;
};
