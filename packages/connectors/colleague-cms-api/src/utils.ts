import { fetchClient, resolveBaseUrl } from '@energon-connectors/core';
import { createApiConsumer } from '@energon/rest-api-consumer';
import { ApiDefinition } from '@energon/rest-api-definition';

import { COLLEAGUE_CMS_API_URLS } from './config';
import { ColleagueCmsApiContext } from './types';

const buildApiConsumer = <T extends ApiDefinition>(
  ctx: ColleagueCmsApiContext,
  apiDef: T,
) => {
  const baseUrl =
    process.env.COLLEAGUE_CMS_URL ||
    resolveBaseUrl(COLLEAGUE_CMS_API_URLS, ctx);
  const headers = {
    Auth: () => `Bearer ${ctx.identityClientToken()}`,
  };
  const client = fetchClient(baseUrl, headers, ctx);
  return createApiConsumer(apiDef, client);
};

export { buildApiConsumer };
