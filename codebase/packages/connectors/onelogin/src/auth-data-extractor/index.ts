import { Handler, Response } from "express";
import { getDataFromCookie } from "../plugins/utils";
import { AUTH_DATA_COOKIE_NAME } from "../onelogin-middleware";

export type AuthData = {
  encRefreshToken?: string;
  idToken?: string;
};

export const openIdAuthDataMiddleware = (
  authDataCookieName = AUTH_DATA_COOKIE_NAME,
): Handler => {
  return (req, res, next) => {
    if (!req.cookies || !req.signedCookies)
      throw Error("cookie-parser with correct key is required");

    const authData = getDataFromCookie<AuthData>(req, {
      cookieName: authDataCookieName,
      compressed: true,
    });
    if (authData) {
      setOpenIdAuthData(res, authData);
    }
    return next();
  };
};

export const setOpenIdAuthData = (res: Response, authData: AuthData) => {
  res.oneLoginAuthData = authData;
};

export const getOpenIdAuthData = (res: Response): AuthData => {
  if (res.oneLoginAuthData == null)
    throw Error("No auth data found in response object");
  return res.oneLoginAuthData;
};

declare global {
  namespace Express {
    export interface Response {
      oneLoginAuthData?: AuthData;
    }
  }
}
