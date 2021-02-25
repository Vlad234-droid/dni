/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: '.env.example' });
import { envAccessor, ProcessEnv, EnvAccessor } from './env-accessor';

describe('Env accessor', () => {
  it('validate the envs', () => {
    expect(envAccessor.validate()).toBeUndefined();
  });

  it('validate failed with missing env variable should throw an error', () => {
    (<ProcessEnv>process.env).CLIENT_SECRET = '';

    expect(() => envAccessor.reReadEnv().validate()).toThrowError(
      'CLIENT_SECRET is missing',
    );
  });

  it('should be one instance', () => {
    const envAccessorOther = EnvAccessor.getInstance();

    expect(envAccessor).toEqual(envAccessorOther);
  });
});
