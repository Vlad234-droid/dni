import {
  initializeOpenidMiddleware,
  identityTokenSwapPlugin,
  pinoLogger,
  colleagueApiPlugin,
  userDataPlugin,
  OpenIdRouter,
  OpenIdUserInfo,
} from '@dni-connectors/onelogin';

import { dniUserDataResolver } from '../config/auth-data';
import { ProcessConfig } from '../config/config-accessor';
import { isPROD } from '@dni-common/connector-utils';

import { dniUserRefreshPlugin } from './onelogin-plugins';

export const initializeOpenid = async ({
  runtimeEnvironment,
  apiEnv,
  applicationIdTokenCookieName,
  applicationSessionCookieName,
  applicationCookieParserSecret,
  applicationUserDataCookieName,
  applicationUserDataCookieSecret,
  stickCookiesToApplicationPath,
  oidcIssuerUrl,
  applicationServerUrlRoot,
  applicationPublicUrl,
  oidcAuthCallbackPath,
  oidcRedirectAfterLogoutPath,
  oidcClientId,
  oidcClientSecret,
  oidcRefreshTokenSecret,
  oidcGroupFiltersRegex,
  oidcAdminGroups,
  oidcManagerGroups,
  identityClientId,
  identityClientSecret,
  identityUserScopedTokenCookieSecret,
  identityUserScopedTokenCookieName,
  defaultRoles,
}: ProcessConfig): Promise<OpenIdRouter> => {
  const isProduction = isPROD(runtimeEnvironment());

  const openidMiddleware = initializeOpenidMiddleware({
    runtimeEnvironment: runtimeEnvironment(),

    /**
     * The OneLogin generated Client ID for your OpenID Connect app
     */
    clientId: oidcClientId(),

    /**
     * The OneLogin generated Client Secret for your OpenID Connect app
     */
    clientSecret: oidcClientSecret(),

    /**
     * A key used to sign & verify cookie values
     */
    cookieKey: applicationCookieParserSecret(),

    /**
     * issuer url e.g. https://login.ourtesco.com/oidc/2
     */
    issuerUrl: oidcIssuerUrl(),

    /**
     * Client secret used to encrypt refresh token
     */
    refreshTokenSecret: oidcRefreshTokenSecret(),

    /**
     * A callback root that was registered for the application e.g. https://www.ourtesco.com (without the applicationPath)
     */
    applicationServerUrlRoot: applicationServerUrlRoot(),

    /**
     * A path the app is mounted on e.g. for https://www.ourtesco.com/my-shift the path is /my-shift.
     * If the app is mounted on root path do not provide this option.
     */
    applicationPath: applicationPublicUrl(),

     /**
     * A callback path that was registered for the application e.g. /sso/auth/callback
     */
    registeredAuthCallbackUrlPath: oidcAuthCallbackPath(),

    /**
     * Absolute url that we will redirect to after logout.
     * Default: `${applicationPath}/sso/logout/callback`
     */
    registeredRedirectAfterLogoutPath: oidcRedirectAfterLogoutPath(),

    /**
     * 
     * @param path 
     * @returns 
     */
    isViewPath: (path: string) => !path.match('^(/api|/auth|/sso|/static|/favicon.ico)'),

    /**
     * Paths that won't be part of token validation and refreshing
     */
    ignoredPathsFragments: ['/api/cms-events'],

    /**
     * In case of error, calls containg that path framgents won't result in redirect.
     * Instead middleware will return an error with correct status. Could be used for AJAX calls.
     */
    noRedirectPathFragments: ['/api'],

    /**
     * Optional, auth data cookie configuration
     */
    authTokenCookie: {
      name: applicationIdTokenCookieName(),
      path: stickCookiesToApplicationPath() ? applicationPublicUrl() : '/',
    },

    /**
     * Optional, session cookie configuration
     */
    sessionCookie: {
      name: applicationSessionCookieName(),
      path: stickCookiesToApplicationPath() ? applicationPublicUrl() : '/',
    },

    /**
     * Scopes of the data that we want to be present in the id_token
     */
    scope: ['openid', 'profile', 'params', 'groups'],

    /**
     * Optional, callback that will be called with Event type objects durring authentication process
     */
    logger: pinoLogger({ name: 'middleware.onelogin' }),

    /**
     * If true sets authToken and encRefreshToken in 'authData' cookie.
     */
    requireAccessToken: true,

    plugins: [
      userDataPlugin({
        optional: false,
        cookieConfig: {
          cookieName: applicationUserDataCookieName(),
          secret: applicationUserDataCookieSecret(),
          path: stickCookiesToApplicationPath() ? applicationPublicUrl() : '/',
          httpOnly: false,
          secure: isProduction,
          signed: isProduction,
          cookieShapeResolver: (userInfo: OpenIdUserInfo) =>
            dniUserDataResolver(
              { defaultRoles, oidcGroupFiltersRegex, oidcManagerGroups, oidcAdminGroups } as ProcessConfig,
              userInfo,
            ),
        },
      }),
      identityTokenSwapPlugin({
        identityClientId: identityClientId(),
        identityClientSecret: identityClientSecret(),
        strategy: 'oidc',
        apiEnv: apiEnv,
        cookieConfig: {
          cookieName: identityUserScopedTokenCookieName(),
          secret: identityUserScopedTokenCookieSecret(),
          path: stickCookiesToApplicationPath() ? applicationPublicUrl() : '/',
          httpOnly: true,
          secure: isProduction,
          signed: isProduction,
        },
      }),
      colleagueApiPlugin({
        optional: true,
        apiEnv: apiEnv,
        // ====================================================
        // Omit cookie config to do not store data into cookies
        // cookieConfig: {
        //   cookieName: applicationColleagueCookieName(),
        //   secret: applicationColleagueCookieSecret(),
        //   path: stickCookiesToApplicationPath() ? applicationPublicUrl() : '/',
        //   httpOnly: true,
        //   secure: isProduction,
        //   signed: isProduction,
        //   cookieShapeResolver: (colleague: Colleague) => colleagueInfoResolver({} as ProcessConfig, colleague),
        // },
      }),
      dniUserRefreshPlugin({
        optional: false,
        cache: true,
      }),
    ],
  });

  return openidMiddleware;
};
