import yn from 'yn';

import { isDEV } from './env';
import { ProcessEnv, getEnv } from './env-accessor';
import { defaultConfig } from './default';

export type ProcessConfig = {
  // general
  buildEnvironment: () => string;
  environment: () => string;
  port: () => number;
  // D&I application specific settings
  applicationName: () => string;
  applicationPublicUrl: () => string;
  applicationUrlRoot: () => string;
  applicationUrlTemplatePost: () => string;
  applicationUrlTemplateEvent: () => string;
  applicationUrlUnsubscribe: () => string;
  applicationUploadSize: () => number;
  // cookies settings
  applicationCookieParserSecret: () => string;
  applicationColleagueCookieName: () => string;
  applicationUserDataCookieName: () => string;
  // cache related props
  cacheIdentityTokenKey: () => string;
  cacheIdentityTokenTtl: () => number;
  cacheColleagueTtl: () => number;
  // onelogin
  useOneLogin: () => boolean;
  oneLoginIssuerUrl: () => string;
  oneLoginApplicationPath: () => string | undefined;
  oneLoginCallbackUrlRoot: () => string;
  oneLoginCallbackPath: () => string;
  oneLoginRedirectAfterLogoutUrl: () => string;
  oidcClientId: () => string;
  oidcClientSecret: () => string;
  oidcRefreshTokenSecret: () => string;
  // roles group assigments
  oidcGroupFiltersRegex: () => RegExp[];
  oidcAdminGroups: () => string[];
  oidcManagerGroups: () => string[];
  defaultRoles: () => string[];
  // identity
  identityClientId: () => string;
  identityClientSecret: () => string;
  identityUserScopedTokenCookieName: () => string;
  identityUserScopedTokenCookieSecret: () => string;
  // confirmit
  confirmitPassword: () => string;
  // mock
  mockServerUrl: () => string;
};

export class ConfigAccessor {
  private static instance: ConfigAccessor;
  private readonly config: ProcessConfig;

  private constructor(processEnv: ProcessEnv) {
    this.config = {
      // general
      buildEnvironment: () => processEnv.BUILD_ENV,
      environment: () => processEnv.NODE_ENV,
      port: () => (isNaN(Number(processEnv.NODE_PORT)) ? defaultConfig.port : Number(processEnv.NODE_PORT)),
      // D&I application specific settings
      applicationName: () => defaultConfig.applicationName,
      applicationPublicUrl: () => processEnv.APPLICATION_PUBLIC_URL,
      applicationUrlRoot: () => processEnv.APPLICATION_URL_ROOT,
      applicationUrlTemplatePost: () => processEnv.APPLICATION_URL_TEMPLATE_POST,
      applicationUrlTemplateEvent: () => processEnv.APPLICATION_URL_TEMPLATE_EVENT,
      applicationUrlUnsubscribe: () => processEnv.APPLICATION_URL_UNSUBSCRIBE,
      applicationUploadSize: () => defaultConfig.applicationUploadSize,
      // cookies settings
      applicationCookieParserSecret: () =>
        processEnv.APPLICATION_COOKIE_PARSER_SECRET || defaultConfig.applicationCookieParserSecret,
      applicationColleagueCookieName: () =>
        processEnv.APPLICATION_COLLEAGUE_DATA_COOKIE_NAME || defaultConfig.applicationColleagueCookieName,
      applicationUserDataCookieName: () =>
        processEnv.APPLICATION_USER_DATA_COOKIE_NAME || defaultConfig.applicationUserDataCookieName,
      // cache related props
      cacheIdentityTokenKey: () => processEnv.CACHE_IDENTITY_TOKEN_KEY || defaultConfig.cacheIdentityTokenKey,
      cacheIdentityTokenTtl: () =>
        isNaN(Number(processEnv.CACHE_IDENTITY_TOKEN_TTL))
          ? defaultConfig.cacheIdentityTokenTtl
          : Number(processEnv.CACHE_IDENTITY_TOKEN_TTL),
      cacheColleagueTtl: () =>
        isNaN(Number(processEnv.CACHE_COLLEAGUE_TTL))
          ? defaultConfig.cacheColleagueTtl
          : Number(processEnv.CACHE_COLLEAGUE_TTL),
      // onelogin
      useOneLogin: () => yn(processEnv.USE_ONELOGIN, { default: false }),
      oneLoginIssuerUrl: () => processEnv.ONELOGIN_ISSUER_URL,
      oneLoginApplicationPath: () =>
        processEnv.APPLICATION_PUBLIC_URL !== '/' ? processEnv.APPLICATION_PUBLIC_URL : undefined,
      oneLoginCallbackUrlRoot: () => processEnv.APPLICATION_URL_ROOT,
      oneLoginCallbackPath: () => processEnv.ONELOGIN_CALLBACK_PATH,
      oneLoginRedirectAfterLogoutUrl: () =>
        processEnv.ONELOGIN_REDIRECT_AFTER_LOGOUT_URL
          ? processEnv.ONELOGIN_REDIRECT_AFTER_LOGOUT_URL
          : processEnv.APPLICATION_PUBLIC_URL === '/'
          ? processEnv.APPLICATION_URL_ROOT
          : `${processEnv.APPLICATION_URL_ROOT}${processEnv.APPLICATION_PUBLIC_URL}`,
      oidcClientId: () => processEnv.OIDC_CLIENT_ID,
      oidcClientSecret: () => processEnv.OIDC_CLIENT_SECRET,
      oidcRefreshTokenSecret: () => processEnv.OIDC_REFRESH_TOKEN_SECRET,
      // roles group assigments
      oidcGroupFiltersRegex: () => defaultConfig.oidcGroupFiltersRegex,
      oidcAdminGroups: () => (processEnv.OIDC_GROUPS_ADMIN_ROLE ? processEnv.OIDC_GROUPS_ADMIN_ROLE.split(/[,;]/) : []),
      oidcManagerGroups: () =>
        processEnv.OIDC_GROUPS_MANAGER_ROLE ? processEnv.OIDC_GROUPS_MANAGER_ROLE.split(/[,;]/) : [],
      defaultRoles: () => [defaultConfig.defaultRole],
      // identity
      identityClientId: () => processEnv.IDENTITY_CLIENT_ID,
      identityClientSecret: () => processEnv.IDENTITY_CLIENT_SECRET,
      identityUserScopedTokenCookieName: () => processEnv.IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME,
      identityUserScopedTokenCookieSecret: () => processEnv.IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET,
      // confirmit
      confirmitPassword: () => processEnv.CONFIRMIT_PASSWORD || '',
      // mock
      mockServerUrl: () => {
        if (!isDEV(processEnv.BUILD_ENV)) {
          throw new Error('Mock server is available only for DEV environment.');
        }
        return processEnv.MOCK_SERVER_URL || '';
      },
    };
  }

  static getInstance(processEnv: ProcessEnv): ConfigAccessor {
    if (!this.instance) {
      this.instance = new this(processEnv);
    }

    return this.instance;
  }

  public getConfig(): ProcessConfig {
    return this.config;
  }
}

export const getConfig = () => {
  // validate if all required process env variables exist
  getEnv().validate();

  return ConfigAccessor.getInstance(getEnv().getVariables()).getConfig();
};
