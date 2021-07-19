import {
  getOpenidMiddleware,
  identityTokenSwapPlugin,
  identityClientScopedTokenPlugin,
  userDataPlugin,
  OpenIdUserInfo,
  withReturnTo,
  pinoLogger,
} from '@dni-connectors/onelogin';
import { ColleagueV2 } from '@dni-connectors/colleague-api';

// import cookieParser from 'cookie-parser';

import { isPROD } from '../config/env';
import { ProcessConfig } from '../config/config-accessor';
import { colleagueInfoResolver, openIdUserInfoResolver } from '../config/auth-data';

import { colleagueDataPlugin } from './plugins';


interface ErrorMessage {
  errorType: string;
  errorMessage: string;
  stack: string;
}

interface LogMessage {
  message: string;
}

export const configureOneloginMidleware = async ({
  environment,
  applicationCookieParserSecret,
  applicationColleagueCookieName,
  applicationUserDataCookieName,
  oneLoginIssuerUrl,
  oneLoginApplicationPath,
  oneLoginCallbackUrlRoot,
  oneLoginCallbackPath,
  oneLoginRedirectAfterLogoutUrl,
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
}: ProcessConfig) => {
  const isProduction = isPROD(environment());
  const identityIdAndSecret = `${identityClientId()}:${identityClientSecret()}`;

  const identityClientScopedToken = identityClientScopedTokenPlugin({
    identityIdAndSecret,
    cache: true,
  });

  const identityClientScopedTokenMiddleware = (): Middleware => {
    return identityClientScopedToken;
  };

  const openidMiddleware = getOpenidMiddleware({
    /** The OneLogin generated Client ID for your OpenID Connect app */
    clientId: oidcClientId(),

    /** The OneLogin generated Client Secret for your OpenID Connect app */
    clientSecret: oidcClientSecret(),

    /** A key used to sign & verify cookie values */
    cookieKey: applicationCookieParserSecret(),

    /** issuer url e.g. https://login.ourtesco.com/oidc/2 */
    issuerUrl: oneLoginIssuerUrl(),

    /** Client secret used to encrypt refresh token */
    refreshTokenSecret: oidcRefreshTokenSecret(),

    /** A callback root that was registered for the application e.g. https://ourtesco.com (without the applicationPath) */
    registeredCallbackUrlRoot: oneLoginCallbackUrlRoot(),

    /** A callback path that was registered for the application e.g. /auth/openid/callback */
    registeredCallbackUrlPath: oneLoginCallbackPath(),

    /**
     * A path the app is mounted on e.g. for https://ourtesco.com/my-shift the path is /my-shift.
     * If the app is mounted on root path do not provide this option.
     */
    applicationPath: oneLoginApplicationPath(),

    /**
     * Paths that won't be part of token validation and refreshing
     */
    ignoredPathsFragments: ['/api/cms-events'],

    /**
     * In case of error, calls containg that path framgents won't result in redirect.
     * Instead middleware will return an error with correct status. Could be used for AJAX calls.
     */
    //noRedirectPathFragments: [],

    /** Scopes of the data that we want to be present in the id_token */
    scope: ['openid', 'profile', 'params', 'groups'],

    /** Optional, callback that will be called with Event type objects durring authentication process */
    logger: pinoLogger({ 
      name: 'server.express.middleware.onelogin',
      prettyPrint: { 
        colorize: true, 
        translateTime: 'yyyy-mm-dd HH:MM:ss o', 
        ignore: 'pid,hostname',
      },
    }),

    /** If true sets idToken and encRefreshToken in 'authData' cookie. */
    requireIdToken: true,

    /**
     * Absolute url that we will redirect to after logout, that can lead to onelogin session termination ednpoint .
     * Default: `${applicationPath}/sso/auth`
     */
    redirectAfterLogoutUrl: oneLoginRedirectAfterLogoutUrl(),

    plugins: [
      userDataPlugin({
        cookieConfig: {
          cookieName: applicationUserDataCookieName(),
          httpOnly: true,
          secure: isProduction,
          signed: isProduction,
          cookieShapeResolver: (userInfo: OpenIdUserInfo) => openIdUserInfoResolver(
            { defaultRoles, oidcGroupFiltersRegex, oidcManagerGroups, oidcAdminGroups } as ProcessConfig, 
            userInfo),
        },
      }),
      identityTokenSwapPlugin({
        identityIdAndSecret,
        strategy: 'oidc',
        cookieConfig: {
          cookieName: identityUserScopedTokenCookieName(),
          secret: identityUserScopedTokenCookieSecret(),
          httpOnly: true,
          secure: isProduction,
          signed: isProduction,
        },
      }),
      identityClientScopedToken,
      // identityClientScopedTokenPlugin({
      //   identityIdAndSecret,
      //   cache: true,
      // }),
      colleagueDataPlugin({
        fields: [ "locationUUID" ],
        optional: true,
        cookieConfig: {
          cookieName: applicationColleagueCookieName(),
          httpOnly: true,
          secure: isProduction,
          signed: isProduction,
          cookieShapeResolver: (colleague: ColleagueV2) => colleagueInfoResolver(
            { } as ProcessConfig, 
            colleague),
        },
      }),
    ],
  });

  const openIdMiddleware = withReturnTo(await openidMiddleware, {
    isViewPath: (path: string) => !path.match('^(/api|/auth|/sso)'),
    appPath: oneLoginApplicationPath(),
  });

  return {
    openIdMiddleware,
    identityClientScopedTokenMiddleware,
  };
};
