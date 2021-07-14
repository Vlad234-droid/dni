/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: '.env.example' });
import { getEnv, ProcessEnv, EnvAccessor } from './env-accessor';

describe('Env accessor', () => {
  it('validate the envs', () => {
    expect(getEnv().validate()).toBeUndefined();
  });

  it('validate failed with missing env variable should throw an error', () => {
    (<ProcessEnv>process.env).OIDC_CLIENT_SECRET = '';

    expect(() => getEnv().refresh().validate()).toThrowError('OIDC_CLIENT_SECRET is missing');
  });

  it('should be one instance', () => {
    const envAccessorOther = EnvAccessor.getInstance();

    expect(getEnv()).toEqual(envAccessorOther);
  });
});
