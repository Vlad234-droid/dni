import { createApiRouter } from '@energon/rest-api-provider';
import { cmsNetworksApiDef, Network } from '@dni-connectors/colleague-cms-api';
import { buildNetworkCRUD } from 'crud';

const COLLECTION_SIZE = 60;
const CRUD = buildNetworkCRUD(COLLECTION_SIZE);

export const cmsNetworksApiRouter = createApiRouter(cmsNetworksApiDef)({
  getNetworks: async ({ params: { _start, _limit } }) =>
    CRUD.findAll(_start, _limit),
  getNetworksCount: async () => CRUD.count(),
  getNetwork: async ({ params: { id } }) => CRUD.findBy(id)! as Network,
  postNetwork: async () => CRUD.createOne(),
  putNetwork: async ({ params: { id } }) => CRUD.updateOne(id),
  deleteNetwork: async ({ params: { id } }) => CRUD.deleteBy(id)!,
});
