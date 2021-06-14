import { createApiRouter } from '@energon/rest-api-provider';
import {
  cmsOrganizationsApiDef,
  Organization,
} from '@dni-connectors/colleague-cms-api';
import { buildOrganizationCRUD } from 'crud';

const COLLECTION_SIZE = 20;
const CRUD = buildOrganizationCRUD(COLLECTION_SIZE);

export const cmsOrganizationsApiRouter = createApiRouter(
  cmsOrganizationsApiDef,
)({
  getOrganizations: async ({ params: { _start, _limit } }) =>
    CRUD.findAll(_start, _limit),
  getOrganization: async ({ params: { id } }) =>
    CRUD.findBy(id)! as Organization,
  postOrganization: async () => CRUD.createOne(),
  putOrganization: async ({ params: { id } }) => CRUD.updateOne(id),
  deleteOrganization: async ({ params: { id } }) => CRUD.deleteBy(id)!,
});
