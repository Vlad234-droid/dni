import { isDEV } from '../config/env';

const optionalEnvironmentParameters = [
  'AUTH_DATA_COOKIE_NAME',
  'SESSION_COOKIE_NAME',
  'APPLICATION_RETURN_TO_COOKIE_NAME',
  'APPLICATION_COLLEAGUE_DATA_COOKIE_NAME',
  'APPLICATION_USER_DATA_COOKIE_NAME',
  'STICK_COOKIES_TO_APPLICATION_PATH',
  'ONELOGIN_REDIRECT_AFTER_LOGOUT_URL',
  'CONFIRMIT_PASSWORD',
  'MOCK_SERVER_URL',
  'CACHE_IDENTITY_TOKEN_KEY',
  'CACHE_IDENTITY_TOKEN_TTL',
  'CACHE_COLLEAGUE_TTL',
];

export type ProcessEnv = {
  // general
  BUILD_ENV: string;
  RUNTIME_ENV: string;
  NODE_ENV: string;
  NODE_PORT: string;
  // D&I application specific URLs
  APPLICATION_PUBLIC_URL: string;
  APPLICATION_URL_ROOT: string;
  APPLICATION_URL_TEMPLATE_POST: string;
  APPLICATION_URL_TEMPLATE_EVENT: string;
  APPLICATION_URL_UNSUBSCRIBE: string;
  // cookies settings
  AUTH_DATA_COOKIE_NAME?: string;
  SESSION_COOKIE_NAME?: string;
  APPLICATION_RETURN_TO_COOKIE_NAME?: string;
  APPLICATION_COOKIE_PARSER_SECRET: string;
  APPLICATION_COLLEAGUE_DATA_COOKIE_NAME: string;
  APPLICATION_COLLEAGUE_DATA_COOKIE_SECRET: string;
  APPLICATION_USER_DATA_COOKIE_NAME: string;
  APPLICATION_USER_DATA_COOKIE_SECRET: string;
  STICK_COOKIES_TO_APPLICATION_PATH: string;
  // cache related props
  CACHE_IDENTITY_TOKEN_KEY: string;
  CACHE_IDENTITY_TOKEN_TTL: string;
  CACHE_COLLEAGUE_TTL: string;
  // onelogin
  USE_ONELOGIN: string;
  ONELOGIN_ISSUER_URL: string;
  ONELOGIN_CALLBACK_PATH: string;
  ONELOGIN_REDIRECT_AFTER_LOGOUT_URL?: string;
  OIDC_CLIENT_ID: string;
  OIDC_CLIENT_SECRET: string;
  OIDC_REFRESH_TOKEN_SECRET: string;
  // AD groups tp roles assigments
  OIDC_GROUPS_ADMIN_ROLE?: string;
  OIDC_GROUPS_MANAGER_ROLE?: string;
  // identity
  IDENTITY_CLIENT_ID: string;
  IDENTITY_CLIENT_SECRET: string;
  IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME: string;
  IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET: string;
  // confirmit
  CONFIRMIT_PASSWORD: string;
  // mock
  MOCK_SERVER_URL?: string;
};

export class EnvAccessor {
  private static instance: EnvAccessor;
  private variables: ProcessEnv = {} as ProcessEnv;

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
    Object.entries(this.variables)
      .filter(([key, val]) => !val && !optionalEnvironmentParameters.includes(key))
      .forEach(([key]) => {
        throw Error(`${key} is missing`);
      });
  }

  public getVariables() {
    return this.variables;
  }

  public refresh() {
    this.readEnv();
    return this;
  }

  private readEnv() {
    const {
      // general
      BUILD_ENV,
      RUNTIME_ENV,
      NODE_ENV,
      NODE_PORT,
      // D&I application specific URLs
      APPLICATION_PUBLIC_URL,
      APPLICATION_URL_ROOT,
      APPLICATION_URL_TEMPLATE_POST,
      APPLICATION_URL_TEMPLATE_EVENT,
      APPLICATION_URL_UNSUBSCRIBE,
      // cookies settings
      AUTH_DATA_COOKIE_NAME,
      SESSION_COOKIE_NAME,
      APPLICATION_RETURN_TO_COOKIE_NAME,
      APPLICATION_COOKIE_PARSER_SECRET,
      APPLICATION_COLLEAGUE_DATA_COOKIE_NAME,
      APPLICATION_COLLEAGUE_DATA_COOKIE_SECRET,
      APPLICATION_USER_DATA_COOKIE_NAME,
      APPLICATION_USER_DATA_COOKIE_SECRET,
      STICK_COOKIES_TO_APPLICATION_PATH,
      // cache related props
      CACHE_IDENTITY_TOKEN_KEY,
      CACHE_IDENTITY_TOKEN_TTL,
      CACHE_COLLEAGUE_TTL,
      // onelogin
      USE_ONELOGIN,
      ONELOGIN_ISSUER_URL,
      ONELOGIN_CALLBACK_PATH,
      ONELOGIN_REDIRECT_AFTER_LOGOUT_URL,
      OIDC_CLIENT_ID,
      OIDC_CLIENT_SECRET,
      OIDC_REFRESH_TOKEN_SECRET,
      // AD groups tp roles assigments
      OIDC_GROUPS_ADMIN_ROLE,
      OIDC_GROUPS_MANAGER_ROLE,
      // identity
      IDENTITY_CLIENT_ID,
      IDENTITY_CLIENT_SECRET,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET,
      // confirmit
      CONFIRMIT_PASSWORD,
      // mock
      MOCK_SERVER_URL,
    } = process.env as ProcessEnv;

    this.variables = {
      // general
      BUILD_ENV,
      RUNTIME_ENV,
      NODE_ENV,
      NODE_PORT,
      // D&I application specific URLs
      APPLICATION_PUBLIC_URL,
      APPLICATION_URL_ROOT,
      APPLICATION_URL_TEMPLATE_POST,
      APPLICATION_URL_TEMPLATE_EVENT,
      APPLICATION_URL_UNSUBSCRIBE,
      // cookies settings
      AUTH_DATA_COOKIE_NAME,
      SESSION_COOKIE_NAME,
      APPLICATION_RETURN_TO_COOKIE_NAME,
      APPLICATION_COOKIE_PARSER_SECRET,
      APPLICATION_COLLEAGUE_DATA_COOKIE_NAME,
      APPLICATION_COLLEAGUE_DATA_COOKIE_SECRET,
      APPLICATION_USER_DATA_COOKIE_NAME,
      APPLICATION_USER_DATA_COOKIE_SECRET,
      STICK_COOKIES_TO_APPLICATION_PATH,
      // cache related props
      CACHE_IDENTITY_TOKEN_KEY,
      CACHE_IDENTITY_TOKEN_TTL,
      CACHE_COLLEAGUE_TTL,
      // onelogin
      USE_ONELOGIN,
      ONELOGIN_ISSUER_URL,
      ONELOGIN_CALLBACK_PATH,
      ONELOGIN_REDIRECT_AFTER_LOGOUT_URL,
      OIDC_CLIENT_ID,
      OIDC_CLIENT_SECRET,
      OIDC_REFRESH_TOKEN_SECRET,
      // AD groups tp roles assigments
      OIDC_GROUPS_ADMIN_ROLE,
      OIDC_GROUPS_MANAGER_ROLE,
      // identity
      IDENTITY_CLIENT_ID,
      IDENTITY_CLIENT_SECRET,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET,
      // confirmit
      CONFIRMIT_PASSWORD,
      // mock
      ...(isDEV(BUILD_ENV) ? { MOCK_SERVER_URL } : undefined),
    };
  }
}

export const getEnv = () => EnvAccessor.getInstance();
