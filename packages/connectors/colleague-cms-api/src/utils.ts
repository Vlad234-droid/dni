import { fetchClient, resolveBaseUrl } from '@energon-connectors/core';
import { createApiConsumer } from '@energon/rest-api-consumer';
import { ApiDefinition } from '@energon/rest-api-definition';

import { DNI_CMS_API_URLS } from './config';
import { DniCmsApiContext } from './types';

const buildApiConsumer = <T extends ApiDefinition>(
  ctx: DniCmsApiContext,
  apiDef: T,
) => {
  const client = buildClient(ctx);
  return createApiConsumer(apiDef, client);
};

const buildClient = (ctx: DniCmsApiContext) => {
  const baseUrl =
    process.env.COLLEAGUE_CMS_URL || resolveBaseUrl(DNI_CMS_API_URLS, ctx);
  const headers = {
    Auth: () => `Bearer ${ctx.identityClientToken()}`,
  };

  const client = fetchClient(baseUrl, headers, ctx);

  return client;
};

const buildParams = <T, U = unknown>(
  params: T,
  tenantkey: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: U = undefined as any,
) => ({
  params,
  fetchOpts: { headers: { tenantkey } },
  body,
});

export { buildApiConsumer, buildParams, buildClient };
