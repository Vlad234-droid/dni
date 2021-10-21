import yn from 'yn';

import { ApiEnv } from '@energon-connectors/core';

import { getAppEnv, isLocal, isDEV } from './env';
import { ProcessEnv, getEnv } from './env-accessor';
import { defaultConfig } from './default';

export type ProcessConfig = {
  // general
  buildEnvironment: () => string;
  runtimeEnvironment: () => string;
  environment: () => string;
  apiEnv: () => ApiEnv;
  port: () => number;
  loggerRootName: () => string;
  loggerLevel: () => string | undefined;
  loggerPretify: () => boolean | undefined;
  // D&I application specific settings
  applicationName: () => string;
  applicationPublicUrl: () => string;
  applicationServerUrlRoot: () => string;
  applicationUrlTemplatePost: () => string;
  applicationUrlTemplateEvent: () => string;
  applicationUrlUnsubscribe: () => string;
  applicationUploadSize: () => number;
  // cookies settings
  authDataCookieName: () => string | undefined;
  sessionCookieName: () => string | undefined;
  applicationReturnToCookieName: () => string | undefined;
  applicationCookieParserSecret: () => string | undefined;
  applicationColleagueCookieName: () => string;
  applicationColleagueCookieSecret: () => string | undefined;
  applicationUserDataCookieName: () => string;
  applicationUserDataCookieSecret: () => string | undefined;
  stickCookiesToApplicationPath: () => boolean;
  // cache related props
  cacheIdentityTokenKey: () => string;
  cacheIdentityTokenTtl: () => number;
  cacheColleagueTtl: () => number;
  // onelogin
  useOneLogin: () => boolean;
  oidcIssuerUrl: () => string;
  oidcAuthCallbackPath: () => string;
  oidcRedirectAfterLogoutPath: () => string;
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
      runtimeEnvironment: () => processEnv.RUNTIME_ENV,
      environment: () => processEnv.NODE_ENV,
      apiEnv: () =>
        getAppEnv(
          this.config.runtimeEnvironment(),
          isLocal(this.config.runtimeEnvironment()) ? this.config.mockServerUrl() : undefined,
        ),
      port: () => (isNaN(Number(processEnv.NODE_PORT)) ? defaultConfig.port : Number(processEnv.NODE_PORT)),
      loggerRootName: () => processEnv.LOGGER_ROOT_NAME || defaultConfig.loggerRootName,
      loggerLevel: () => processEnv.LOGGER_LEVEL,
      loggerPretify: () => processEnv.LOGGER_PRETIFY ? yn(processEnv.LOGGER_PRETIFY, { default: false }) : undefined,
      // D&I application specific settings
      applicationName: () => defaultConfig.applicationName,
      applicationServerUrlRoot: () => processEnv.APPLICATION_SERVER_URL_ROOT,
      applicationPublicUrl: () => processEnv.APPLICATION_PUBLIC_URL,
      applicationUrlTemplatePost: () => processEnv.APPLICATION_URL_TEMPLATE_POST,
      applicationUrlTemplateEvent: () => processEnv.APPLICATION_URL_TEMPLATE_EVENT,
      applicationUrlUnsubscribe: () => processEnv.APPLICATION_URL_UNSUBSCRIBE,
      applicationUploadSize: () => defaultConfig.applicationUploadSize,

      // cookies settings
      authDataCookieName: () => processEnv.AUTH_DATA_COOKIE_NAME || undefined,
      sessionCookieName: () => processEnv.SESSION_COOKIE_NAME || undefined,
      applicationReturnToCookieName: () => processEnv.APPLICATION_RETURN_TO_COOKIE_NAME || undefined,
      applicationCookieParserSecret: () =>
        processEnv.APPLICATION_COOKIE_PARSER_SECRET || defaultConfig.applicationCookieParserSecret,
      applicationColleagueCookieName: () =>
        processEnv.APPLICATION_COLLEAGUE_DATA_COOKIE_NAME || defaultConfig.applicationColleagueCookieName,
      applicationColleagueCookieSecret: () => processEnv.APPLICATION_COLLEAGUE_DATA_COOKIE_SECRET,
      applicationUserDataCookieName: () =>
        processEnv.APPLICATION_USER_DATA_COOKIE_NAME || defaultConfig.applicationUserDataCookieName,
      applicationUserDataCookieSecret: () => processEnv.APPLICATION_USER_DATA_COOKIE_SECRET,
      stickCookiesToApplicationPath: () => yn(processEnv.STICK_COOKIES_TO_APPLICATION_PATH, { default: false }),

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
      oidcIssuerUrl: () => processEnv.OIDC_ISSUER_URL,
      oidcAuthCallbackPath: () => processEnv.OIDC_AUTH_CALLBACK_PATH || defaultConfig.oidcAuthCallbackPath,
      oidcRedirectAfterLogoutPath: () => processEnv.OIDC_REDIRECT_AFTER_LOGOUT_CALLBACK_PATH || defaultConfig.oidcRedirectAfterLogoutPath,
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

export const prettify = (config: ProcessConfig): void => {
  console.table(
    Object.keys(config).reduce((acc, key) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value: any;
      try {
        value = config[key as keyof ProcessConfig]();
      } catch (error) {
        value = error;
      }
      return { ...acc, [key]: Array.isArray(value) ? value.join(', ') : value };
    }, {} as Record<keyof ProcessConfig, string>),
  );
};

export const getConfig = () => {
  // validate if all required process env variables exist
  getEnv().validate();

  return ConfigAccessor.getInstance(getEnv().getVariables()).getConfig();
};
