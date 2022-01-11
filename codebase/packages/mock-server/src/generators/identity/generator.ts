import faker from 'faker';
import { ClientTokenResponse, TokenClaims, UserTokenResponse } from '@dni-connectors/identity-api';

export const userTokenResponse: UserTokenResponse = {
  access_token: faker.datatype.uuid(),
  id_token: faker.datatype.uuid(),
  refresh_token: faker.datatype.uuid(),
  token_type: 'Bearer',
  expires_in: faker.datatype.datetime().getTime(),
  scope: faker.datatype.string(20),
  claims: {
    sub: faker.datatype.uuid(),
    exp: faker.datatype.datetime().getTime() + 3600 * 1000,
  } as TokenClaims,
};


export const clientTokenResponse: ClientTokenResponse = {
  access_token: faker.datatype.uuid(),
  token_type: 'Bearer',
  expires_in: faker.datatype.datetime().getTime(),
  scope: faker.datatype.string(20),
  claims: {
    sub: faker.datatype.uuid(),
    exp: faker.datatype.datetime().getTime() + 3600 * 1000,
  } as TokenClaims,
};
