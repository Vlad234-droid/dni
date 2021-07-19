import jwt from 'jsonwebtoken';
import { UserScopeToken } from '@dni-connectors/onelogin';

type CookieData = UserScopeToken;
type DecodedAccessToken = { jti: string };

const accessTokenJtiExtractor = (keepData = false) => (
  cookieData: CookieData,
) => {
  const { jti: access_token } = jwt.decode(
    cookieData.access_token,
  ) as DecodedAccessToken;

  if (!access_token) {
    throw new Error('Decoded JWT does not contain jti property!');
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
