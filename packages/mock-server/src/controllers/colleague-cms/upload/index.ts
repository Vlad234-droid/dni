import { createApiRouter } from '@energon/rest-api-provider';
import { cmsUploadApiDef, UploadFile } from '@dni-connectors/colleague-cms-api';
import { buildCRUD } from 'utils';

import { generateUpload, generateUploads } from 'generators/colleague-cms';

const COLLECTION_SIZE = 20;

const CRUD = buildCRUD<UploadFile>(
  () => generateUploads(COLLECTION_SIZE),
  generateUpload,
);

export const cmsUploadApiRouter = createApiRouter(cmsUploadApiDef)({
  getFiles: async ({ params: { _start, _limit } }) =>
    CRUD.findAll(_start, _limit),
  getFile: async ({ params: { id } }) => CRUD.findBy(id)! as UploadFile,
  postFiles: async () => [CRUD.createOne()],
  deleteFile: async ({ params: { id } }) => CRUD.deleteBy(id)!,
});
