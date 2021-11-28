import express from 'express';
import { OneloginFlow } from '../logger';

const ONELOGIN_ERROR_NAME = 'OneloginError';

export class OneloginError extends Error {
  public readonly name = ONELOGIN_ERROR_NAME;

  constructor(public readonly flow: OneloginFlow, readonly message: string, public readonly status = 500) {
    super(message);
  }

  public static is(error: unknown): error is OneloginError {
    return (error as OneloginError)?.name === ONELOGIN_ERROR_NAME;
  }
}

export type OneloginCookieConfig = {
  /** Opional, corresponds to cookies secure flag
   * Secure cookies will only be send over HTTPS protocol
   * defaults to false
   * app.enable('trust proxy') needs to be present in the server for secure cookies to work
   */
  secure?: boolean;

  /** Optional, coresponds to cookie httpOnly flag
   * HttpOnly cookies cannot be accessed by JavaScript
   * defaults to false
   */
  httpOnly?: boolean;

  /**
   * optional, if set to true cookie will be saved as signed
   */
  signed?: boolean;

  /**
   * optional, if set, cookie path will be set to specified value
   */
  path?: string;

  /**
   * cookie name
   */
  name?: string;
};

export type Strategy = 'openid';

export const AUTHENTICATION_PATH = '/sso/auth';
export const LOGOUT_PATH = '/sso/logout';
export const REFRESH_PATH = '/sso/refresh';

export const USER_INFO_COOKIE_NAME = 'tesco.userinfo';
export const AUTH_TOKEN_COOKIE_NAME = 'tesco.colleague.jwt';
export const SESSION_COOKIE_NAME = 'tesco.session';

export const ONELOGIN_RETURN_URI_COOKIE_NAME = 'onelogin.return.uri';
export const ONELOGIN_RETURN_URI_PARAM = 'onelogin_return_uri';

export const defaultCookieConfig = (env?: string) => ({
  secure: env === 'production',
  httpOnly: env === 'production',
  signed: true,
  path: '/',
});

export type UserInfoResolver<I, O> = (rawUserInfo: I, req: express.Request, res: express.Response) => O | Promise<O>;

export type OneloginRouteInfo = {
  authenticationPath: string;
  logoutPath: string;
  registeredAuthCallbackUrlPath: string;
  registeredRedirectAfterLogoutPath: string;
};

export type IssuerMetadataLight = {
  issuer: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
  jwksUri: string;
  userinfoEndpoint: string;
};

export type OpenIdStartupLog = {
  /**
   * information about mounted routes - logging it out might be helpful
   */
  oneloginRoutes: OneloginRouteInfo;
  issuerMetadata: IssuerMetadataLight;
};

export type OpenIdRouter = express.Router & OpenIdStartupLog;

export { initializeOpenidMiddleware } from './openid-protocol';
export type { OpenidConfig } from './openid-protocol';
