import { createApiRouter } from '@energon/rest-api-provider';
import { identityApiDef } from '@dni-connectors/identity-api';

import { clientTokenResponse, userTokenResponse } from 'generators/identity';

export const identityApiRouter = createApiRouter(identityApiDef)({
  issueToken: async () => clientTokenResponse,
  exchangeUserToken: async () => userTokenResponse,
  refreshUserToken: async () => userTokenResponse,
});
