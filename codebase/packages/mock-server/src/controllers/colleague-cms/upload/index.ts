import { createApiRouter } from '@energon/rest-api-provider';
import { cmsUploadApiDef, UploadFile } from '@dni-connectors/colleague-cms-api';

import { buildUploadCRUD } from 'crud';

const COLLECTION_SIZE = 20;
const CRUD = buildUploadCRUD(COLLECTION_SIZE);

export const cmsUploadApiRouter = createApiRouter(cmsUploadApiDef)({
  getFile: async ({ params: { id } }) => CRUD.findBy(id)! as UploadFile,
  getFiles: async ({ params: { _start, _limit } }) => CRUD.findAll(_start, _limit),
  postFiles: async () => [CRUD.createOne()],
  deleteFile: async ({ params: { id } }) => CRUD.deleteBy(id)!,
});
