import { Handler, Response } from 'express';
import { getDataFromCookie } from '../plugins/utils';
import { AUTH_TOKEN_COOKIE_NAME } from '../onelogin-middleware';
import { Client, IntrospectionResponse } from 'openid-client';
import jwt from 'jsonwebtoken';
import { extractOpenIdUserInfo } from 'oidc-data-extractor';

export type AuthData = {
  accessToken?: string;
  idToken?: string;
  encRefreshToken?: string;
  sessionId?: string;
};

/**
 * Express middleware, which handles OpenId AuthData
 * @param authTokenCookieName The name of cookie to be used for OpenId AuthData
 * @returns
 */
export const openIdAuthDataMiddleware = (client: Client, authTokenCookieName = AUTH_TOKEN_COOKIE_NAME): Handler => {
  return async (req, res, next) => {
    if (!req.cookies || !req.signedCookies) {
      throw Error('cookie-parser with correct key is required');
    }

    res.openIdClient = client;

    const authData = getDataFromCookie<AuthData>(req, {
      cookieName: authTokenCookieName,
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
  res.openIdAuthData = authData;
};

/**
 * Gets OpenIdAuthData from response object
 * @param res Response object
 * @param throwIfNotFound Should throw error if no AuthData found, default is true
 * @returns OpenId AuthData
 */
export const getOpenIdAuthData = (res: Response, throwIfNotFound = true): AuthData | undefined => {
  if (res.openIdAuthData == null && throwIfNotFound) {
    throw Error('No auth data found in response object');
  }

  return res.openIdAuthData;
};

export const getOpenIdSessionId = (res: Response, throwIfNotFound = true): string | undefined => {
  const authData = getOpenIdAuthData(res, throwIfNotFound);
  return authData?.sessionId;
}

declare global {
  namespace Express {
    export interface Response {
      openIdAuthData?: AuthData;
      openIdClient: Client;
    }
  }
}

