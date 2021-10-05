import { createApiRouter } from '@energon/rest-api-provider';
import { colleagueApiDef, Colleague } from '@dni-connectors/colleague-api';

export const colleagueApiRouter = createApiRouter(colleagueApiDef)({
  // getColleague: async () => ({ data: { colleague } }),
  getColleague: async () => ({} as Colleague),
  getColleagues: async () => ({ colleagues: [] as Colleague[] }),
});
