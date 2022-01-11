import jwt from 'jsonwebtoken';
import { UserTokenResponse } from '@dni-connectors/identity-api';

type CookieData = UserTokenResponse;
type DecodedAccessToken = { jti: string };

const accessTokenJtiExtractor = (keepData = false) => (
  cookieData: CookieData,
) => {
  const { jti: access_token } = jwt.decode(
    cookieData.access_token,
  ) as DecodedAccessToken;

  if (!access_token) {
    throw Error('Decoded JWT does not contain jti property!');
  }

  if (keepData) {
    return {
      ...cookieData,
      access_token,
    };
  }

  return {
    access_token,
  };
};

export type { CookieData, DecodedAccessToken };

export { accessTokenJtiExtractor };
