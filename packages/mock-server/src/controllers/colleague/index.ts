import { createApiRouter } from '@energon/rest-api-provider';
import { colleagueApiDef } from '@dni-connectors/colleague-api';

import { colleague } from 'generators/colleague';

export const colleagueApiRouter = createApiRouter(colleagueApiDef)({
  getColleague: async () => ({ data: { colleague } }),
});
