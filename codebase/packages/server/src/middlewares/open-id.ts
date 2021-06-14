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
    clientId: oidcClientId,
    clientSecret: oidcClientSecret,
    cookieKey,
    issuerUrl,
    refreshTokenSecret,
    registeredCallbackUrlPath,
    registeredCallbackUrlRoot,
    redirectAfterLogoutUrl,
    applicationPath: publicUrl,
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
          cookieShapeResolver: (userInfo) => {
            const userData = {
              ...userInfo,
              fullName: userInfo.name,
              firstName: userInfo.given_name || userInfo.name.split(/\s+/)[0],
              email: userInfo.preferred_username,
              params: {
                ...userInfo.params,
                employeeNumber: (userInfo.params?.employeeNumber ||
                  userInfo.params?.EmployeeNumber) as string,
              },
              groups: (Array.isArray(userInfo.groups)
                ? userInfo.groups
                : (((userInfo.groups as unknown) as string) || '').split(',') ||
                  []
              )
                .filter(Boolean)
                .filter((group) => groupsWithAccess.includes(group)),
            };
            return {
              ...userData,
              roles: userData.groups.map((group: string) =>
                group.replace(regExp, ''),
              ),
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
