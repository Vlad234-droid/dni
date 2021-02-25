import { ConfigAccessor, ProcessConfig } from './config-accessor';
import { ProcessEnv } from './env-accessor';
import { defaultConfig } from '../config';

describe('Config accessor', () => {
  const processEnv = {
    NODE_ENV: 'NODE_ENV',
    NODE_PORT: 'NODE_PORT',
    APPLICATION_PATH: 'APPLICATION_PATH',
    CLIENT_ID: 'CLIENT_ID',
    CLIENT_SECRET: 'CLIENT_SECRET',
    COOKIE_SESSION_KEY: 'COOKIE_SESSION_KEY',
    ISSUER_URL: 'ISSUER_URL',
    REFRESH_TOKEN_SECRET: 'REFRESH_TOKEN_SECRET',
    REGISTERED_CALLBACK_URL_PATH: 'REGISTERED_CALLBACK_URL_PATH',
    REGISTERED_CALLBACK_URL_ROOT: 'REGISTERED_CALLBACK_URL_ROOT',
    REDIRECT_AFTER_LOGOUT_URL: 'REDIRECT_AFTER_LOGOUT_URL',
    IDENTITY_CLIENT_ID: 'IDENTITY_CLIENT_ID',
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
      clientId: 'CLIENT_ID',
      clientSecret: 'CLIENT_SECRET',
    } as Partial<ProcessConfig>);
  });

  it('should be one instance', () => {
    const configAccessorOther = ConfigAccessor.getInstance({} as ProcessEnv);

    expect(configAccessor).toEqual(configAccessorOther);
  });
});
