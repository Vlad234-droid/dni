import {
  getOpenidMiddleware,
  identityTokenSwapPlugin,
  userDataPlugin,
} from '@energon/onelogin';
import cookieParser from 'cookie-parser';

import { ProcessConfig } from 'services/config-accessor';
import { accessTokenJtiExtractor } from '../utils';

export const openIdConfig = ({
  clientId,
  clientSecret,
  cookieKey,
  issuerUrl,
  refreshTokenSecret,
  registeredCallbackUrlPath,
  registeredCallbackUrlRoot,
  redirectAfterLogoutUrl,
  applicationPath,
  identityClientId,
  identityUserScopedTokenCookieSecret,
  identityUserScopedTokenCookieName,
  groupsWithAccess,
}: ProcessConfig) => {
  const openIdCookieParser = cookieParser(cookieKey);
  const openId = getOpenidMiddleware({
    clientId,
    clientSecret,
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
        identityIdAndSecret: identityClientId,
        strategy: 'oidc',
        cookieConfig: {
          cookieName: identityUserScopedTokenCookieName,
          secret: identityUserScopedTokenCookieSecret,
          httpOnly: true,
          secure: false,
          signed: false,
          cookieShapeResolver: accessTokenJtiExtractor(), // set to false if only access_token is needed
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
