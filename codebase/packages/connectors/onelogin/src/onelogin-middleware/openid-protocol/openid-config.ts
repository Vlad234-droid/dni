import { ViewPathPredicate } from '../../return-to-middlewares';
import { OneloginCookieConfig } from '../';

import { Logger } from '../../logger';
import { Plugin } from '../../plugins';

export type SupportedScopes =
  | 'openid'
  | 'profile'
  | 'email'
  | 'address'
  | 'phone'
  | 'offline_access'
  | 'params'
  | 'groups';

/**
 * OpenId plugin configuration
 */
export type OpenidConfig = {
  /**
   * Specifies name of runtime enviroment. Will be injected into all plugins by default.
   */
  runtimeEnvironment: string;

  /**
   * The OneLogin generated Client ID for your OpenID Connect app
   */
  clientId: string;

  /**
   * The OneLogin generated Client Secret for your OpenID Connect app
   */
  clientSecret: string;

  /**
   * Client secret used to encrypt refresh token
   */
  refreshTokenSecret: string;

  /**
   * A key used to sign & verify cookie values
   */
  cookieKey?: string;

  /**
   * issuer url e.g. https://login.ourtesco.com/oidc/2
   */
  issuerUrl: string;

  /**
   * A callback root that was registered for the application e.g. https://www.ourtesco.com (without the applicationPath)
   */
  applicationServerUrlRoot: string;

  /**
   * A path the app is mounted on e.g. for https://www.ourtesco.com/my-shift the path is /my-shift.
   * If the app is mounted on root path do not provide this option.
   */
  applicationPath?: string;

  /**
   * An authenication callback path that was registered for the application e.g. /sso/auth/callback
   */
  registeredAuthCallbackUrlPath: string;

  /**
   * Absolute url that we will redirect to after logout.
   * Default: `/sso/logout/callback`
   */
  registeredRedirectAfterLogoutPath: string;

  /**
   * 
   */
  isViewPath?: ViewPathPredicate,

  /**
   * Scopes of the data that we want to be present in the id_token
   */
  scope: readonly ['openid', ...SupportedScopes[]];

  /**
   * Paths that won't be part of token validation and refreshing
   */
  ignoredPathsFragments?: string[];

  /**
   * In case of error, calls containg that path framgents won't result in redirect.
   * Instead middleware will return an error with correct status. Could be used for AJAX calls.
   */
  noRedirectPathFragments?: string[];

  /**
   * Optional, auth data cookie configuration
   */
  authTokenCookie?: OneloginCookieConfig;

  /**
   * Optional, session cookie configuration
   */
  sessionCookie?: OneloginCookieConfig;

  /**
   * Plugin functions called inside onelogin middleware.
   * They have access to user info and auth data from thier respective getters (e.g.: getOpenIdUserInfo,
   * getOpenIdAuthData, getSamlUserInfo).
   * Throwing error will be logged, but won't cause the signing in to crash.
   * Will be called while authenticating and with every non ignored requests.
   */
  plugins?: Plugin[];

  /**
   * Optional, callback that will be called with Event type objects durring authentication process
   */
  logger?: Logger;

  /**
   * If true sets authToken and encRefreshToken in 'authData' cookie.
   */
  requireAccessToken?: boolean;

};
