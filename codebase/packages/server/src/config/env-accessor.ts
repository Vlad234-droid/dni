import { isDEV } from '@dni-common/connector-utils';

const optionalEnvironmentParameters = [
  'BUILD_ENV',
  'LOGGER_ROOT_NAME',
  'LOGGER_LEVEL',
  'LOGGER_PRETIFY',
  'APPLICATION_AUTH_TOKEN_COOKIE_NAME',
  'APPLICATION_SESSION_COOKIE_NAME',
  'APPLICATION_RETURN_TO_COOKIE_NAME',
  'APPLICATION_COLLEAGUE_DATA_COOKIE_NAME',
  'APPLICATION_USER_DATA_COOKIE_NAME',
  'STICK_COOKIES_TO_APPLICATION_PATH',
  'OIDC_REDIRECT_AFTER_LOGOUT_CALLBACK_PATH',
  'COLLEAGUE_CMS_URL',
  'COLLEAGUE_CMS_TENANT_KEY',
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
  LOGGER_ROOT_NAME?: string;
  LOGGER_LEVEL?: string;
  LOGGER_PRETIFY?: string;
  // D&I application specific URLs
  APPLICATION_PUBLIC_URL: string;
  APPLICATION_SERVER_URL_ROOT: string;
  APPLICATION_URL_TEMPLATE_POST: string;
  APPLICATION_URL_TEMPLATE_EVENT: string;
  APPLICATION_URL_TEMPLATE_CONFIRMATION: string;
  APPLICATION_URL_UNSUBSCRIBE: string;
  // cookies settings
  APPLICATION_AUTH_TOKEN_COOKIE_NAME?: string;
  APPLICATION_SESSION_COOKIE_NAME?: string;
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
  OIDC_ISSUER_URL: string;
  OIDC_AUTH_CALLBACK_PATH?: string;
  OIDC_REDIRECT_AFTER_LOGOUT_CALLBACK_PATH?: string;
  OIDC_CLIENT_ID: string;
  OIDC_CLIENT_SECRET: string;
  OIDC_REFRESH_TOKEN_SECRET: string;
  // AD groups tp roles assigments
  OIDC_GROUPS_ADMIN_ROLE?: string;
  OIDC_GROUPS_MANAGER_ROLE?: string;
  // colleague CMS
  COLLEAGUE_CMS_URL?: string;
  COLLEAGUE_CMS_TENANT_KEY?: string;
  // identity
  IDENTITY_CLIENT_ID: string;
  IDENTITY_CLIENT_SECRET: string;
  IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME: string;
  IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET: string;
  // mock
  MOCK_SERVER_URL?: string;
  // mailing
  MAILING_NEW_ENTITY_TEMPLATE_ID: string;
  MAILING_CONFIRMATION_NEW_EMAIL_TEMPLATE_ID: string;
  MAILING_CONFIRMATION_OLD_EMAIL_TEMPLATE_ID: string;
  MAILING_CONFIRMATION_EMAIL_SUCCESS_TEMPLATE_ID: string;
  MAILING_SHARE_STORY_TEMPLATE_ID: string;
  MAILING_STAKEHOLDER_EMAIL: string;
  MAILING_CHUNK_SIZE: string;
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
      LOGGER_ROOT_NAME,
      LOGGER_LEVEL,
      LOGGER_PRETIFY,
      // D&I application specific URLs
      APPLICATION_PUBLIC_URL,
      APPLICATION_SERVER_URL_ROOT,
      APPLICATION_URL_TEMPLATE_POST,
      APPLICATION_URL_TEMPLATE_EVENT,
      APPLICATION_URL_TEMPLATE_CONFIRMATION,
      APPLICATION_URL_UNSUBSCRIBE,
      // cookies settings
      APPLICATION_AUTH_TOKEN_COOKIE_NAME,
      APPLICATION_SESSION_COOKIE_NAME,
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
      OIDC_ISSUER_URL,
      OIDC_AUTH_CALLBACK_PATH,
      OIDC_REDIRECT_AFTER_LOGOUT_CALLBACK_PATH,
      OIDC_CLIENT_ID,
      OIDC_CLIENT_SECRET,
      OIDC_REFRESH_TOKEN_SECRET,
      // AD groups tp roles assigments
      OIDC_GROUPS_ADMIN_ROLE,
      OIDC_GROUPS_MANAGER_ROLE,
      // colleague CMS
      COLLEAGUE_CMS_URL,
      COLLEAGUE_CMS_TENANT_KEY,
      // identity
      IDENTITY_CLIENT_ID,
      IDENTITY_CLIENT_SECRET,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET,
      // mock
      MOCK_SERVER_URL,
      // mailing
      MAILING_NEW_ENTITY_TEMPLATE_ID,
      MAILING_CONFIRMATION_NEW_EMAIL_TEMPLATE_ID,
      MAILING_CONFIRMATION_OLD_EMAIL_TEMPLATE_ID,
      MAILING_CONFIRMATION_EMAIL_SUCCESS_TEMPLATE_ID,
      MAILING_SHARE_STORY_TEMPLATE_ID,
      MAILING_STAKEHOLDER_EMAIL,
      MAILING_CHUNK_SIZE,
    } = process.env as ProcessEnv;

    this.variables = {
      // general
      BUILD_ENV,
      RUNTIME_ENV,
      NODE_ENV,
      NODE_PORT,
      LOGGER_ROOT_NAME,
      LOGGER_LEVEL,
      LOGGER_PRETIFY,
      // D&I application specific URLs
      APPLICATION_PUBLIC_URL,
      APPLICATION_SERVER_URL_ROOT,
      APPLICATION_URL_TEMPLATE_POST,
      APPLICATION_URL_TEMPLATE_EVENT,
      APPLICATION_URL_TEMPLATE_CONFIRMATION,
      APPLICATION_URL_UNSUBSCRIBE,
      // cookies settings
      APPLICATION_AUTH_TOKEN_COOKIE_NAME,
      APPLICATION_SESSION_COOKIE_NAME,
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
      OIDC_ISSUER_URL,
      OIDC_AUTH_CALLBACK_PATH,
      OIDC_REDIRECT_AFTER_LOGOUT_CALLBACK_PATH,
      OIDC_CLIENT_ID,
      OIDC_CLIENT_SECRET,
      OIDC_REFRESH_TOKEN_SECRET,
      // AD groups tp roles assigments
      OIDC_GROUPS_ADMIN_ROLE,
      OIDC_GROUPS_MANAGER_ROLE,
      // colleague CMS
      COLLEAGUE_CMS_URL,
      COLLEAGUE_CMS_TENANT_KEY,
      // identity
      IDENTITY_CLIENT_ID,
      IDENTITY_CLIENT_SECRET,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET,
      // mock
      MOCK_SERVER_URL: isDEV(BUILD_ENV) ? MOCK_SERVER_URL : undefined,
      // mailing
      MAILING_NEW_ENTITY_TEMPLATE_ID,
      MAILING_CONFIRMATION_NEW_EMAIL_TEMPLATE_ID,
      MAILING_CONFIRMATION_OLD_EMAIL_TEMPLATE_ID,
      MAILING_CONFIRMATION_EMAIL_SUCCESS_TEMPLATE_ID,
      MAILING_SHARE_STORY_TEMPLATE_ID,
      MAILING_STAKEHOLDER_EMAIL,
      MAILING_CHUNK_SIZE,
    };
  }
}

export const getEnv = () => EnvAccessor.getInstance();
