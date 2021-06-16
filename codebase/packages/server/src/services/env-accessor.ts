import { isDEV } from '../config/env';

type ProcessEnv = {
  // general
  NODE_ENV: string;
  NODE_PORT: string;
  PUBLIC_URL: string;
  // client
  COOKIE_SESSION_KEY: string;
  COOKIE_USER_KEY: string;
  // onelogin
  ISSUER_URL: string;
  OIDC_CLIENT_ID: string;
  OIDC_CLIENT_SECRET: string;
  REGISTERED_CALLBACK_URL_ROOT: string;
  REGISTERED_CALLBACK_URL_PATH: string;
  REDIRECT_AFTER_LOGOUT_URL: string;
  REFRESH_TOKEN_SECRET: string;
  WITH_ONE_LOGIN: string;
  // identity
  IDENTITY_CLIENT_ID: string;
  IDENTITY_CLIENT_SECRET: string;
  IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET: string;
  IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME: string;
  // mock
  MOCK_SERVER_URL?: string;
  // confirmit
  CONFIRMIT_PASSWORD: string;
};

class EnvAccessor {
  private static instance: EnvAccessor;
  private data: ProcessEnv = {} as ProcessEnv;

  private constructor() {
    this.readEnv();
  }

  static getInstance(): EnvAccessor {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  public validate() {
    Object.entries(this.data)
      .filter(([, val]) => !val)
      .forEach(([key]) => {
        throw Error(`${key} is missing`);
      });
  }

  public getData() {
    return this.data;
  }

  public reReadEnv() {
    this.readEnv();

    return this;
  }

  private readEnv() {
    const {
      NODE_ENV,
      NODE_PORT,
      PUBLIC_URL,
      COOKIE_SESSION_KEY,
      COOKIE_USER_KEY,
      OIDC_CLIENT_ID,
      OIDC_CLIENT_SECRET,
      ISSUER_URL,
      REGISTERED_CALLBACK_URL_ROOT,
      REGISTERED_CALLBACK_URL_PATH,
      REDIRECT_AFTER_LOGOUT_URL,
      REFRESH_TOKEN_SECRET,
      WITH_ONE_LOGIN,
      IDENTITY_CLIENT_ID,
      IDENTITY_CLIENT_SECRET,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME,
      MOCK_SERVER_URL,
      CONFIRMIT_PASSWORD,
    } = process.env as ProcessEnv;

    this.data = {
      NODE_ENV,
      NODE_PORT,
      PUBLIC_URL,
      COOKIE_SESSION_KEY,
      COOKIE_USER_KEY,
      OIDC_CLIENT_ID,
      OIDC_CLIENT_SECRET,
      ISSUER_URL,
      REGISTERED_CALLBACK_URL_ROOT,
      REGISTERED_CALLBACK_URL_PATH,
      REDIRECT_AFTER_LOGOUT_URL,
      REFRESH_TOKEN_SECRET,
      WITH_ONE_LOGIN,
      IDENTITY_CLIENT_ID,
      IDENTITY_CLIENT_SECRET,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME,
      CONFIRMIT_PASSWORD,
      ...(isDEV(NODE_ENV)
        ? {
            MOCK_SERVER_URL,
          }
        : undefined),
    };
  }
}

const envAccessor = EnvAccessor.getInstance();

export type { ProcessEnv };

export { envAccessor, EnvAccessor };