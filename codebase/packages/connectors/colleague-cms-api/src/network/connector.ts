import { defineAPI } from '@energon/rest-api-definition';

import { Network, NetworkApiParams, NetworkBody } from './types';
import { buildApiConsumer, buildParams, buildFetchClient, buildFetchParams } from '../utils';
import { DniCmsApiContext, ApiInput } from '../types';

export const cmsNetworksApiDef = defineAPI((endpoint) => ({
  getNetworksCount: endpoint.get('/networks/count').params<Omit<NetworkApiParams, 'id'>>().response<number>().build(),

  getNetwork: endpoint.get('/networks/:id').params<Pick<NetworkApiParams, 'id'>>().response<Network>().build(),

  getNetworks: endpoint.get('/networks').params<Omit<NetworkApiParams, 'id'>>().response<Network[]>().build(),

  postNetwork: endpoint.post('/networks').params<NetworkApiParams>().body<NetworkBody>().response<Network>().build(),

  putNetwork: endpoint
    .put('/networks/:id')
    .params<Pick<NetworkApiParams, 'id'>>()
    .body<NetworkBody>()
    .response<Network>()
    .build(),

  deleteNetwork: endpoint.delete('/networks/:id').params<Pick<NetworkApiParams, 'id'>>().response<Network>().build(),
}));

export const cmsNetworksApiConnector = (ctx: DniCmsApiContext) => {
  const apiConsumer = buildApiConsumer(ctx, cmsNetworksApiDef);
  const fetchClient = buildFetchClient(ctx);

  return {
    getNetwork: async ({ params, tenantkey }: ApiInput<NetworkApiParams>) =>
      apiConsumer.getNetwork(buildParams(params, tenantkey)),

    getNetworks: ({ params, tenantkey }: ApiInput<Omit<NetworkApiParams, 'id'>>) =>
      fetchClient<Network[]>(cmsNetworksApiDef.getNetworks, params, buildFetchParams(tenantkey)),

    getNetworksCount: ({ params, tenantkey }: ApiInput<Omit<NetworkApiParams, 'id'>>) =>
      fetchClient<number>(cmsNetworksApiDef.getNetworksCount, params, buildFetchParams(tenantkey)),

    postNetwork: async ({ params, body, tenantkey }: ApiInput<NetworkApiParams, NetworkBody>) =>
      apiConsumer.postNetwork(buildParams(params, tenantkey, body!)),

    putNetwork: async ({ params, body, tenantkey }: ApiInput<NetworkApiParams, NetworkBody>) =>
      apiConsumer.putNetwork(buildParams(params, tenantkey, body!)),

    deleteNetwork: ({ params, tenantkey }: ApiInput<Pick<NetworkApiParams, 'id'>>) =>
      apiConsumer.deleteNetwork(buildParams(params, tenantkey)),
  };
};

export type CmsNetworksApi = ReturnType<typeof cmsNetworksApiConnector>;
