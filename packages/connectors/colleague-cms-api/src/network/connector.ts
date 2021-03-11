import { defineAPI } from '@energon/rest-api-definition';

import { Network, NetworkApiParams } from './types';
import { buildApiConsumer } from '../utils';
import { ColleagueCmsApiContext } from '../types';

type HandlerInput = {
  params: NetworkApiParams;
};

export const cmsNetworksApiDef = defineAPI((endpoint) => ({
  getNetwork: endpoint
    .get('/networks/:id')
    .params<NetworkApiParams>()
    .response<Network>()
    .build(),
  // TODO: add another methods
}));

export const cmsNetworksApiConnector = (ctx: ColleagueCmsApiContext) => {
  const apiConsumer = buildApiConsumer(ctx, cmsNetworksApiDef);

  return {
    getNetwork: async ({ params }: HandlerInput) =>
      apiConsumer.getNetwork({
        params,
      }),
  };
};

export type CmsNetworksApi = ReturnType<typeof cmsNetworksApiConnector>;
