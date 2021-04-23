import { createApiRouter } from '@energon/rest-api-provider';
import { cmsUploadApiDef, UploadFile } from '@dni-connectors/colleague-cms-api';

import { buildUploadCRUD } from 'crud';

const COLLECTION_SIZE = 20;
const CRUD = buildUploadCRUD(COLLECTION_SIZE);

export const cmsUploadApiRouter = createApiRouter(cmsUploadApiDef)({
  getFiles: async ({ params: { _start, _limit } }) =>
    CRUD.findAll(_start, _limit),
  getFile: async ({ params: { id } }) => CRUD.findBy(id)! as UploadFile,
  postFiles: async () => [CRUD.createOne()],
  deleteFile: async ({ params: { id } }) => CRUD.deleteBy(id)!,
});
