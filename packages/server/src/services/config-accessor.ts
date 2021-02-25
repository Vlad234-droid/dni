import { ProcessEnv } from './env-accessor';
import { defaultConfig } from '../config';

type ProcessConfig = {
  // general
  environment: string;
  port: string;
  applicationPath: string;
  // client
  clientId: string;
  clientSecret: string;
  cookieKey: string;
  // onelogin
  issuerUrl: string;
  refreshTokenSecret: string;
  registeredCallbackUrlPath: string;
  registeredCallbackUrlRoot: string;
  redirectAfterLogoutUrl: string;
  // identity
  identityClientId: string;
  identityUserScopedTokenCookieName: string;
  identityUserScopedTokenCookieSecret: string;
  // default
  groupsWithAccess: string[];
};

class ConfigAccessor {
  private static instance: ConfigAccessor;
  private data = {} as ProcessConfig;

  private constructor(processEnv: ProcessEnv) {
    const {
      NODE_ENV: environment,
      NODE_PORT: port,
      APPLICATION_PATH: applicationPath,
      CLIENT_ID: clientId,
      CLIENT_SECRET: clientSecret,
      COOKIE_SESSION_KEY: cookieKey,
      ISSUER_URL: issuerUrl,
      REFRESH_TOKEN_SECRET: refreshTokenSecret,
      REGISTERED_CALLBACK_URL_PATH: registeredCallbackUrlPath,
      REGISTERED_CALLBACK_URL_ROOT: registeredCallbackUrlRoot,
      REDIRECT_AFTER_LOGOUT_URL: redirectAfterLogoutUrl,
      IDENTITY_CLIENT_ID: identityClientId,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET: identityUserScopedTokenCookieSecret,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME: identityUserScopedTokenCookieName,
    } = processEnv;

    this.data = {
      ...defaultConfig,
      environment,
      port,
      // if root "/" needs to be converted to an empty string
      applicationPath: applicationPath.length > 1 ? applicationPath : '',
      clientId,
      clientSecret,
      cookieKey,
      issuerUrl,
      refreshTokenSecret,
      registeredCallbackUrlPath,
      registeredCallbackUrlRoot,
      redirectAfterLogoutUrl,
      identityClientId,
      identityUserScopedTokenCookieSecret,
      identityUserScopedTokenCookieName,
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
