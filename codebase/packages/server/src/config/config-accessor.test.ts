import { ConfigAccessor, ProcessConfig } from './config-accessor';
import { ProcessEnv } from './env-accessor';
import { defaultConfig } from './default';

describe('Config accessor', () => {
  const processEnv = {
    // general
    BUILD_ENV: 'BUILD_ENV',
    NODE_ENV: 'NODE_ENV',
    NODE_PORT: 'NODE_PORT',
    // D&I application specific URLs
    APPLICATION_PUBLIC_URL: 'APPLICATION_PUBLIC_URL',
    APPLICATION_SERVER_URL_ROOT: 'APPLICATION_SERVER_URL_ROOT',
    APPLICATION_URL_TEMPLATE_POST: 'APPLICATION_URL_TEMPLATE_POST',
    APPLICATION_URL_TEMPLATE_EVENT: 'APPLICATION_URL_TEMPLATE_EVENT',
    APPLICATION_URL_UNSUBSCRIBE: 'APPLICATION_URL_UNSUBSCRIBE',
    // cookies settings
    APPLICATION_COOKIE_PARSER_SECRET: 'APPLICATION_COOKIE_PARSER_SECRET',
    APPLICATION_USER_DATA_COOKIE_NAME: 'APPLICATION_USER_DATA_COOKIE_NAME',
    // onelogin
    USE_ONELOGIN: 'USE_ONELOGIN',
    OIDC_ISSUER_URL: 'OIDC_ISSUER_URL',
    OIDC_AUTH_CALLBACK_PATH: 'OIDC_AUTH_CALLBACK_PATH',
    OIDC_CLIENT_ID: 'OIDC_CLIENT_ID',
    OIDC_CLIENT_SECRET: 'OIDC_CLIENT_SECRET',
    OIDC_REFRESH_TOKEN_SECRET: 'OIDC_REFRESH_TOKEN_SECRET',
    // AD groups tp roles assigments
    OIDC_GROUPS_ADMIN_ROLE: 'OIDC_GROUPS_ADMIN_ROLE',
    OIDC_GROUPS_MANAGER_ROLE: 'OIDC_GROUPS_MANAGER_ROLE',
    // identity
    IDENTITY_CLIENT_ID: 'IDENTITY_CLIENT_ID',
    IDENTITY_CLIENT_SECRET: 'IDENTITY_CLIENT_SECRET',
    IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET: 'IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET',
    IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME: 'IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME',
    // mock
    MOCK_SERVER_URL: 'MOCK_SERVER_URL',
  } as ProcessEnv;

  let configAccessor: ConfigAccessor;

  beforeAll(() => {
    configAccessor = ConfigAccessor.getInstance(processEnv);
  });

  it('should contain default config', () => {
    expect(configAccessor.getConfig()).toMatchObject(defaultConfig);
  });

  // it('should contain valid data', () => {
  //   expect(configAccessor.getConfig()).toMatchObject({
  //     oidcClientId: () => 'OIDC_CLIENT_ID',
  //     oidcClientSecret: () => 'OIDC_CLIENT_SECRET',
  //   } as Partial<ProcessConfig>);
  // });

  it('should be one instance', () => {
    const configAccessorOther = ConfigAccessor.getInstance({} as ProcessEnv);

    expect(configAccessor).toEqual(configAccessorOther);
  });
});
