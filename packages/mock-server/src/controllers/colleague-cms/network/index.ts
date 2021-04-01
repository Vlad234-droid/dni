import { createApiRouter } from '@energon/rest-api-provider';
import { cmsNetworksApiDef, Network } from '@dni-connectors/colleague-cms-api';
import { buildCRUD } from 'utils';

import { generateNetwork, generateNetworks } from 'generators/colleague-cms';

const COLLECTION_SIZE = 60;

const CRUD = buildCRUD<Network>(
  () => generateNetworks(COLLECTION_SIZE),
  generateNetwork,
);

export const cmsNetworksApiRouter = createApiRouter(cmsNetworksApiDef)({
  getNetworks: async ({ params: { _start, _limit } }) =>
    CRUD.findAll(_start, _limit),
  getNetworksCount: async () => COLLECTION_SIZE,
  getNetwork: async ({ params: { id } }) => CRUD.findBy(id)! as Network,
  postNetwork: async () => CRUD.createOne(),
  putNetwork: async ({ params: { id } }) => CRUD.updateOne(id),
  deleteNetwork: async ({ params: { id } }) => CRUD.deleteBy(id)!,
});
