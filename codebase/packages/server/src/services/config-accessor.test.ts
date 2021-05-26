import { ConfigAccessor, ProcessConfig } from './config-accessor';
import { ProcessEnv } from './env-accessor';
import { defaultConfig } from '../config/default';

describe('Config accessor', () => {
  const processEnv = {
    NODE_ENV: 'NODE_ENV',
    NODE_PORT: 'NODE_PORT',
    APPLICATION_PATH: 'APPLICATION_PATH',
    OIDC_CLIENT_ID: 'OIDC_CLIENT_ID',
    OIDC_CLIENT_SECRET: 'OIDC_CLIENT_SECRET',
    COOKIE_SESSION_KEY: 'COOKIE_SESSION_KEY',
    COOKIE_USER_KEY: 'COOKIE_USER_KEY',
    ISSUER_URL: 'ISSUER_URL',
    REFRESH_TOKEN_SECRET: 'REFRESH_TOKEN_SECRET',
    WITH_ONE_LOGIN: 'WITH_ONE_LOGIN',
    REGISTERED_CALLBACK_URL_PATH: 'REGISTERED_CALLBACK_URL_PATH',
    REGISTERED_CALLBACK_URL_ROOT: 'REGISTERED_CALLBACK_URL_ROOT',
    REDIRECT_AFTER_LOGOUT_URL: 'REDIRECT_AFTER_LOGOUT_URL',
    IDENTITY_CLIENT_ID: 'IDENTITY_CLIENT_ID',
    IDENTITY_CLIENT_SECRET: 'IDENTITY_CLIENT_SECRET',
    IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET:
      'IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET',
  } as ProcessEnv;

  let configAccessor: ConfigAccessor;

  beforeAll(() => {
    configAccessor = ConfigAccessor.getInstance(processEnv);
  });

  it('should contain default config', () => {
    expect(configAccessor.getData()).toMatchObject(defaultConfig);
  });

  it('should contain valid data', () => {
    expect(configAccessor.getData()).toMatchObject({
      oidcClientId: 'OIDC_CLIENT_ID',
      oidcClientSecret: 'OIDC_CLIENT_SECRET',
    } as Partial<ProcessConfig>);
  });

  it('should be one instance', () => {
    const configAccessorOther = ConfigAccessor.getInstance({} as ProcessEnv);

    expect(configAccessor).toEqual(configAccessorOther);
  });
});
