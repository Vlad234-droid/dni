import {
  getOpenidMiddleware,
  identityTokenSwapPlugin,
  userDataPlugin,
} from '@energon/onelogin';
import cookieParser from 'cookie-parser';

import { ProcessConfig } from 'services/config-accessor';

export const openIdConfig = ({
  environment,
  oidcClientId,
  oidcClientSecret,
  cookieKey,
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
  const isProduction = environment === 'production';
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
    scope: ['openid', 'profile', 'groups'],
    plugins: [
      identityTokenSwapPlugin({
        identityIdAndSecret: `${identityClientId}:${identityClientSecret}`,
        strategy: 'oidc',
        cookieConfig: {
          cookieName: identityUserScopedTokenCookieName,
          secret: identityUserScopedTokenCookieSecret,
          httpOnly: true,
          secure: isProduction,
          signed: isProduction,
        },
      }),
      userDataPlugin({
        cookieConfig: {
          cookieName: 'user-data',
          cookieShapeResolver: (userInfo) => ({
            ...userInfo,
            groups: (userInfo.groups || []).filter((group) =>
              groupsWithAccess.includes(group),
            ),
          }),
        },
      }),
    ],
  });

  return {
    openId,
    openIdCookieParser,
  };
};
