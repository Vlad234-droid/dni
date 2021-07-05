import { defineAPI } from '@energon/rest-api-definition';

import { Network, NetworkApiParams, NetworkBody } from './types';
import {
  buildApiConsumer,
  buildParams,
  buildFetchClient,
  buildFetchParams,
} from '../utils';
import { DniCmsApiContext, ApiInput } from '../types';

export const cmsNetworksApiDef = defineAPI((endpoint) => ({
  getNetworksCount: endpoint
    .get('/networks/count')
    .params<NetworkApiParams>()
    .response<number>()
    .build(),

  getNetwork: endpoint
    .get('/networks/:id')
    .params<Pick<NetworkApiParams, 'id'>>()
    .response<Network>()
    .build(),

  getNetworks: endpoint
    .get('/networks')
    .params<NetworkApiParams>()
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

export const cmsNetworksApiConnector = (ctx: DniCmsApiContext) => {
  const apiConsumer = buildApiConsumer(ctx, cmsNetworksApiDef);
  const fetchClient = buildFetchClient(ctx);

  return {
    getNetwork: async ({ params }: ApiInput<NetworkApiParams>) =>
      apiConsumer.getNetwork(buildParams(params)),

    getNetworks: ({ params }: ApiInput<NetworkApiParams>) =>
      fetchClient<Network[]>(
        cmsNetworksApiDef.getNetworks,
        params,
        buildFetchParams(),
      ),

    getNetworksCount: ({ params }: ApiInput<NetworkApiParams>) =>
      fetchClient<number>(
        cmsNetworksApiDef.getNetworksCount,
        params,
        buildFetchParams(),
      ),

    postNetwork: async ({
      params,
      body,
    }: ApiInput<NetworkApiParams, NetworkBody>) =>
      apiConsumer.postNetwork(buildParams(params, body!)),

    putNetwork: async ({
      params,
      body,
    }: ApiInput<NetworkApiParams, NetworkBody>) =>
      apiConsumer.putNetwork(buildParams(params, body!)),

    deleteNetwork: ({
      params,
    }: ApiInput<Pick<NetworkApiParams, 'id'>>) =>
      apiConsumer.deleteNetwork(buildParams(params)),
  };
};

export type CmsNetworksApi = ReturnType<typeof cmsNetworksApiConnector>;
