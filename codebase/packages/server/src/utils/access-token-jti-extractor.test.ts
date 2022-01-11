import jwt from 'jsonwebtoken';
import { TokenClaims } from '@dni-connectors/identity-api';

import {
  accessTokenJtiExtractor,
  CookieData,
} from './access-token-jti-extractor';

describe('Access token jti extractor utils', () => {
  const access_token = 'jti';
  const cookie: CookieData = {
    refresh_token: 'refresh_token',
    expires_in: 0,
    token_type: 'token_type',
    scope: 'scope',
    claims: {} as TokenClaims,
    access_token: jwt.sign({ jti: access_token }, 'secret'),
  };

  it('should keep cookie data', () => {
    const tokenJtiExtractor = accessTokenJtiExtractor(true);

    expect(tokenJtiExtractor(cookie)).toEqual({ ...cookie, access_token });
  });

  it('should skip cookie data', () => {
    const tokenJtiExtractor = accessTokenJtiExtractor();

    expect(tokenJtiExtractor(cookie)).toEqual({ access_token });
  });

  it('should throw error for invalid cookie', () => {
    const tokenJtiExtractor = accessTokenJtiExtractor();

    expect(() =>
      tokenJtiExtractor({ access_token: '' } as CookieData),
    ).toThrowError(/jti/);
  });
});
