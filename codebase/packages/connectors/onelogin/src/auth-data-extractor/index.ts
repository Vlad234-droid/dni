import { Handler, Response } from 'express';
import { getDataFromCookie } from '../plugins/utils';
import { AUTH_DATA_COOKIE_NAME } from '../onelogin-middleware';

export type AuthData = {
  encRefreshToken?: string;
  idToken?: string;
};

/**
 * Express middleware, which handles OpenId AuthData
 * @param authDataCookieName The name of cookie to be used for OpenId AuthData
 * @returns
 */
export const openIdAuthDataMiddleware = (authDataCookieName = AUTH_DATA_COOKIE_NAME): Handler => {
  return (req, res, next) => {
    if (!req.cookies || !req.signedCookies) {
      throw Error('cookie-parser with correct key is required');
    }

    const authData = getDataFromCookie<AuthData>(req, {
      cookieName: authDataCookieName,
      compressed: true,
    });

    if (authData) {
      setOpenIdAuthData(res, authData);
    }

    next();
  };
};

/**
 * Sets AuthData to response object
 * @param res Response object
 * @param authData OpenId AuthData to be set
 */
export const setOpenIdAuthData = (res: Response, authData: AuthData) => {
  res.oneLoginAuthData = authData;
};

/**
 * Gets OpenIdAuthData from response object
 * @param res Response object
 * @param throwIfNotFound Should throw error if no AuthData found, default is true
 * @returns OpenId AuthData
 */
export const getOpenIdAuthData = (res: Response, throwIfNotFound = true): AuthData | undefined => {
  if (res.oneLoginAuthData == null && throwIfNotFound) {
    throw Error('No auth data found in response object');
  }

  return res.oneLoginAuthData;
};

declare global {
  namespace Express {
    export interface Response {
      oneLoginAuthData?: AuthData;
    }
  }
}
