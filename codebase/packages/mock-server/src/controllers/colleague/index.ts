import { createApiRouter } from '@energon/rest-api-provider';
import { colleagueApiDef, ColleagueV2 } from '@dni-connectors/colleague-api';

import { colleague } from 'generators/colleague';

export const colleagueApiRouter = createApiRouter(colleagueApiDef)({
  getColleague: async () => ({ data: { colleague } }),
  getColleagueV2: async () => ({} as ColleagueV2),
  getColleaguesV2: async () => [] as ColleagueV2[],
});
