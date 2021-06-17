import { ProcessEnv } from './env-accessor';
import { defaultConfig } from '../config/default';

type ProcessConfig = {
  // general
  appName: string;
  buildEnvironment: string;
  environment: string;
  port: string;
  publicUrl: string;
  uploadSize: number;
  // client
  cookieKey: string;
  cookieUserKey: string;
  // onelogin
  oidcClientId: string;
  oidcClientSecret: string;
  issuerUrl: string;
  refreshTokenSecret: string;
  withOneLogin: boolean;
  registeredCallbackUrlPath: string;
  registeredCallbackUrlRoot: string;
  redirectAfterLogoutUrl: string;
  // identity
  identityClientId: string;
  identityClientSecret: string;
  identityUserScopedTokenCookieName: string;
  identityUserScopedTokenCookieSecret: string;
  // default
  groupsWithAccess: string[];
  // mock
  mockServerUrl?: string;
  // confirmit
  confirmitPassword: string;
};

class ConfigAccessor {
  private static instance: ConfigAccessor;
  private data = {} as ProcessConfig;

  private constructor(processEnv: ProcessEnv) {
    const {
      BUILD_ENV: buildEnvironment,
      NODE_ENV: environment,
      NODE_PORT: port,
      PUBLIC_URL: publicUrl,
      OIDC_CLIENT_ID: oidcClientId,
      OIDC_CLIENT_SECRET: oidcClientSecret,
      COOKIE_SESSION_KEY: cookieKey,
      COOKIE_USER_KEY: cookieUserKey,
      ISSUER_URL: issuerUrl,
      REFRESH_TOKEN_SECRET: refreshTokenSecret,
      WITH_ONE_LOGIN: withOneLogin,
      REGISTERED_CALLBACK_URL_PATH: registeredCallbackUrlPath,
      REGISTERED_CALLBACK_URL_ROOT: registeredCallbackUrlRoot,
      REDIRECT_AFTER_LOGOUT_URL: redirectAfterLogoutUrl,
      IDENTITY_CLIENT_ID: identityClientId,
      IDENTITY_CLIENT_SECRET: identityClientSecret,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET: identityUserScopedTokenCookieSecret,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME: identityUserScopedTokenCookieName,
      MOCK_SERVER_URL: mockServerUrl,
      CONFIRMIT_PASSWORD: confirmitPassword,
    } = processEnv;

    this.data = {
      ...defaultConfig,
      buildEnvironment,
      environment,
      port,
      // if root "/" needs to be converted to an empty string
      publicUrl: publicUrl && publicUrl.length > 1 ? publicUrl : '',
      oidcClientId,
      oidcClientSecret,
      cookieKey,
      cookieUserKey,
      issuerUrl,
      refreshTokenSecret,
      withOneLogin: withOneLogin === 'true',
      registeredCallbackUrlPath,
      registeredCallbackUrlRoot,
      redirectAfterLogoutUrl,
      identityClientId,
      identityClientSecret,
      identityUserScopedTokenCookieSecret,
      identityUserScopedTokenCookieName,
      mockServerUrl,
      confirmitPassword,
    };
  }

  static getInstance(processEnv: ProcessEnv): ConfigAccessor {
    if (!this.instance) {
      this.instance = new this(processEnv);
    }

    return this.instance;
  }

  public getData() {
    return this.data;
  }
}

export type { ProcessConfig };

export { ConfigAccessor };
