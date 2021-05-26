import faker from 'faker';
import { ApiOutput } from '@dni-connectors/identity-api';

export const apiOutput: ApiOutput = {
  access_token: faker.datatype.uuid(),
  token_type: 'Bearer',
  expires_in: faker.datatype.datetime().getTime(),
  scope: faker.datatype.string(20),
  claims: [],
};
