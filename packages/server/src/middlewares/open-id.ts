import {
  getOpenidMiddleware,
  identityTokenSwapPlugin,
  userDataPlugin,
  identityClientScopedTokenPlugin,
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
  applicationPath,
  identityClientId,
  identityClientSecret,
  identityUserScopedTokenCookieSecret,
  identityUserScopedTokenCookieName,
  groupsWithAccess,
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
  const openId = getOpenidMiddleware({
    clientId: oidcClientId,
    clientSecret: oidcClientSecret,
    cookieKey,
    issuerUrl,
    refreshTokenSecret,
    registeredCallbackUrlPath,
    registeredCallbackUrlRoot,
    redirectAfterLogoutUrl,
    applicationPath,
    requireIdToken: false,
    scope: ['openid', 'profile', 'params', 'groups'],
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
          cookieShapeResolver: (userInfo) => ({
            ...userInfo,
            fullName: userInfo.name,
            firstName: userInfo.given_name || userInfo.name.split(/\s+/)[0],
            email: userInfo.preferred_username,
            params: {
              ...userInfo.params,
              employeeNumber: (userInfo.params?.employeeNumber ||
                userInfo.params?.EmployeeNumber) as string,
            },
            groups: (userInfo.groups || []).filter((group) => {
              return groupsWithAccess.includes(group);
            }),
          }),
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
