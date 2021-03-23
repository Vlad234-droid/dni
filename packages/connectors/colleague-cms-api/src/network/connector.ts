import { defineAPI } from '@energon/rest-api-definition';

import { Network, NetworkApiParams, NetworkBody } from './types';
import { buildApiConsumer, buildParams } from '../utils';
import { DniCmsApiContext, ApiInput } from '../types';

export const cmsNetworksApiDef = defineAPI((endpoint) => ({
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

  getNetworksCount: endpoint
    .get('/networks/count')
    .params<NetworkApiParams>()
    .response<number>()
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

  return {
    getNetwork: async ({ params, tenantkey }: ApiInput<NetworkApiParams>) =>
      apiConsumer.getNetwork(buildParams(params, tenantkey)),

    getNetworks: ({ params, tenantkey }: ApiInput<NetworkApiParams>) =>
      apiConsumer.getNetworks(buildParams(params, tenantkey)),

    getNetworksCount: ({ params, tenantkey }: ApiInput<NetworkApiParams>) =>
      apiConsumer.getNetworksCount(buildParams(params, tenantkey)),

    postNetwork: async ({
      params,
      body,
      tenantkey,
    }: ApiInput<NetworkApiParams, NetworkBody>) =>
      apiConsumer.postNetwork(buildParams(params, tenantkey, body!)),

    putNetwork: async ({
      params,
      body,
      tenantkey,
    }: ApiInput<NetworkApiParams, NetworkBody>) =>
      apiConsumer.putNetwork(buildParams(params, tenantkey, body!)),

    deleteNetwork: ({
      params,
      tenantkey,
    }: ApiInput<Pick<NetworkApiParams, 'id'>>) =>
      apiConsumer.deleteNetwork(buildParams(params, tenantkey)),
  };
};

export type CmsNetworksApi = ReturnType<typeof cmsNetworksApiConnector>;
