import { ConnectorContext } from '@energon-connectors/core';
import { defineAPI } from '@energon/rest-api-definition';

import { buildApiConsumer } from '../utils';
import { TENANT_KEY } from '../config';
import { CmsRoutingResponse } from './types';

export const cmsRoutingApiDef = defineAPI((endpoint) => ({
  getRoutingConfig: endpoint
    .get('/navigation/render/:slug')
    .params<{ slug: string; type: 'rfr' }>()
    .response<CmsRoutingResponse>()
    .build(),
}));

export const cmsRoutingApiConnector = (ctx: ConnectorContext) => {
  const apiConsumer = buildApiConsumer(ctx, cmsRoutingApiDef);

  return {
    getRoutingConfig: async () => {
      return apiConsumer.getRoutingConfig({
        params: { slug: '1', type: 'rfr' },
        fetchOpts: { headers: { tenantkey: TENANT_KEY } },
      });
    },
  };
};

export type CmsRoutingApi = ReturnType<typeof cmsRoutingApiConnector>;
