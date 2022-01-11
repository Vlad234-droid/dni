import { defineAPI } from '@energon/rest-api-definition';

import { Network, NetworkApiParams, NetworkBody } from './types';
import { buildApiConsumer, buildParams, buildFetchClient, buildFetchParams } from '../utils';
import { ColleagueCmsApiContext, ApiInput } from '../types';

export const cmsNetworksApiDef = defineAPI((endpoint) => ({
  getNetworksCount: endpoint
    .get('/networks/count')
    .params<Omit<NetworkApiParams, 'id'>>()
    .response<number>()
    .build(),

  getNetwork: endpoint
    .get('/networks/:id')
    .params<Pick<NetworkApiParams, 'id'>>()
    .response<Network>()
    .build(),

  getNetworks: endpoint
    .get('/networks')
    .params<Omit<NetworkApiParams, 'id'>>()
    .response<Network[]>()
    .build(),

  postNetwork: endpoint
    .post('/networks')
    .params<NetworkApiParams>()
    .body<NetworkBody>()
    .response<Network>()
    .build(),

  putNetwork: endpoint
    .put('/networks/:id')
    .params<Pick<NetworkApiParams, 'id'>>()
    .body<NetworkBody>()
    .response<Network>()
    .build(),

  deleteNetwork: endpoint
    .delete('/networks/:id')
    .params<Pick<NetworkApiParams, 'id'>>()
    .response<Network>()
    .build(),
}));

export const cmsNetworksApiConnector = (ctx: ColleagueCmsApiContext) => {
  const apiConsumer = buildApiConsumer(ctx, cmsNetworksApiDef);
  const fetchClient = buildFetchClient(ctx);

  return {
    getNetwork: async ({ params }: ApiInput<NetworkApiParams>) => await apiConsumer.getNetwork(buildParams(params)),

    getNetworks: async ({ params }: ApiInput<Omit<NetworkApiParams, 'id'>>) =>
      await fetchClient<Network[]>(cmsNetworksApiDef.getNetworks, params, buildFetchParams()),

    getNetworksCount: async ({ params }: ApiInput<Omit<NetworkApiParams, 'id'>>) =>
      await fetchClient<number>(cmsNetworksApiDef.getNetworksCount, params, buildFetchParams()),

    postNetwork: async ({ params, body }: ApiInput<NetworkApiParams, NetworkBody>) =>
      await apiConsumer.postNetwork(buildParams(params, body!)),

    putNetwork: async ({ params, body }: ApiInput<NetworkApiParams, NetworkBody>) =>
      await apiConsumer.putNetwork(buildParams(params, body!)),

    deleteNetwork: async ({ params }: ApiInput<Pick<NetworkApiParams, 'id'>>) =>
      await apiConsumer.deleteNetwork(buildParams(params)),
  };
};

export type CmsNetworksApi = ReturnType<typeof cmsNetworksApiConnector>;
