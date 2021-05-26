import { createApiRouter } from '@energon/rest-api-provider';
import { identityApiDef } from '@dni-connectors/identity-api';

import { apiOutput } from 'generators/identity';

export const identityApiRouter = createApiRouter(identityApiDef)({
  getToken: async () => apiOutput,
});
