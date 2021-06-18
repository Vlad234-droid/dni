import {
  getOpenidMiddleware,
  identityTokenSwapPlugin,
  userDataPlugin,
  identityClientScopedTokenPlugin,
  defaultLogger,
} from '@energon/onelogin';
import cookieParser from 'cookie-parser';
import { isPROD } from '../config/env';

import { ProcessConfig } from 'services/config-accessor';

export const openIdConfig = ({
  environment,
  oidcClientId,
  oidcClientSecret,
  cookieKey,
  cookieUserKey,
  issuerUrl,
  refreshTokenSecret,
  registeredCallbackUrlPath,
  registeredCallbackUrlRoot,
  redirectAfterLogoutUrl,
  publicUrl,
  identityClientId,
  identityClientSecret,
  identityUserScopedTokenCookieSecret,
  identityUserScopedTokenCookieName,
  groupsWithAccess,
  appName,
}: ProcessConfig) => {
  const openIdCookieParser = cookieParser(cookieKey);
  const isProduction = isPROD(environment);
  const identityIdAndSecret = `${identityClientId}:${identityClientSecret}`;
  const clientScopedToken = (): Middleware => {
    return identityClientScopedTokenPlugin({
      identityIdAndSecret,
      cache: true,
    });
  };
  const regExp = new RegExp(`.*${appName}-(PPE-)?`);
  const openId = getOpenidMiddleware({
    /** The OneLogin generated Client ID for your OpenID Connect app */
    clientId: oidcClientId,

    /** The OneLogin generated Client Secret for your OpenID Connect app */
    clientSecret: oidcClientSecret,

    /** A key used to sign & verify cookie values */
    cookieKey,

    /** issuer url e.g. https://login.ourtesco.com/oidc/2 */
    issuerUrl,

    /** Client secret used to encrypt refresh token */
    refreshTokenSecret,

    /** A callback root that was registered for the application e.g. https://ourtesco.com (without the applicationPath) */
    registeredCallbackUrlRoot,

    /** A callback path that was registered for the application e.g. /auth/openid/callback */
    registeredCallbackUrlPath,

    /**
     * A path the app is mounted on e.g. for https://ourtesco.com/my-shift the path is /my-shift.
     * If the app is mounted on root path do not provide this option.
     */
    applicationPath: publicUrl,

    /**
     * Paths that won't be part of token validation and refreshing
     */
    ignoredPathsFragments: ['/api/notifications', '/api/cms-events'],

    /**
     * In case of error, calls containg that path framgents won't result in redirect.
     * Instead middleware will return an error with correct status. Could be used for AJAX calls.
     */
    //noRedirectPathFragments: [],

    /** Scopes of the data that we want to be present in the id_token */
    scope: ['openid', 'profile', 'params', 'groups'],

    /** Optional, callback that will be called with Event type objects durring authentication process */
    logger: defaultLogger,

    /** If true sets idToken and encRefreshToken in 'authData' cookie. */
    requireIdToken: false,

    /**
     * Absolute url that we will redirect to after logout, that can lead to onelogin session termination ednpoint .
     * Default: `${applicationPath}/sso/auth`
     */
    redirectAfterLogoutUrl,

    plugins: [
      identityTokenSwapPlugin({
        identityIdAndSecret,
        strategy: 'oidc',
        cookieConfig: {
          cookieName: identityUserScopedTokenCookieName,
          secret: identityUserScopedTokenCookieSecret,
          httpOnly: true,
          secure: isProduction,
          signed: isProduction,
        },
      }),
      clientScopedToken(),
      userDataPlugin({
        cookieConfig: {
          cookieName: cookieUserKey,
          httpOnly: true,
          secure: false,
          signed: false,
          cookieShapeResolver: (userInfo) => {
            const userData = {
              ...userInfo,
              fullName: userInfo.name,
              firstName: userInfo.given_name || userInfo.name.split(/\s+/)[0],
              email: userInfo.preferred_username,
              params: {
                ...userInfo.params,
                employeeNumber: (userInfo.params?.employeeNumber || userInfo.params?.EmployeeNumber) as string,
              },
              groups: (Array.isArray(userInfo.groups)
                ? userInfo.groups
                : ((userInfo.groups as unknown as string) || '').split(',') || []
              )
                .filter(Boolean)
                .filter((group) => groupsWithAccess.includes(group)),
            };
            return {
              ...userData,
              roles: userData.groups.map((group: string) => group.replace(regExp, '')),
            };
          },
        },
      }),
    ],
  });

  return {
    openId,
    openIdCookieParser,
    clientScopedToken,
  };
};
