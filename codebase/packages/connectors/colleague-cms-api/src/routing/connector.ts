import { ConnectorContext } from '@energon-connectors/core';
import { defineAPI } from '@energon/rest-api-definition';
import { ApiInput } from 'types';

import { buildApiConsumer } from '../utils';
import { CmsRoutingResponse, PageConfig } from './types';

export const cmsRoutingApiDef = defineAPI((endpoint) => ({
  getRoutingConfig: endpoint
    .get('/navigation/render/:slug')
    .params<Pick<PageConfig, 'slug'>>()
    .response<CmsRoutingResponse>()
    .build(),
}));

export const cmsRoutingApiConnector = (ctx: ConnectorContext) => {
  const apiConsumer = buildApiConsumer(ctx, cmsRoutingApiDef);

  return {
    getRoutingConfig: async ({ params }: ApiInput<Pick<PageConfig, 'slug'>>) =>
      await apiConsumer.getRoutingConfig({ params }),
  };
};

export type CmsRoutingApi = ReturnType<typeof cmsRoutingApiConnector>;
