import { createApiRouter } from '@energon/rest-api-provider';
import { cmsPostsApiDef, Post } from '@dni-connectors/colleague-cms-api';
import { buildPostCRUD } from 'crud';

const COLLECTION_SIZE = 100;
const CRUD = buildPostCRUD(COLLECTION_SIZE);

export const cmsPostsApiRouter = createApiRouter(cmsPostsApiDef)({
  getPosts: async ({ params: { _start, _limit } }) =>
    CRUD.findAll(_start, _limit),
  getPostsCount: async () => CRUD.count(),
  getPost: async ({ params: { id } }) => CRUD.findBy(id)! as Post,
  postPost: async () => CRUD.createOne(),
  putPost: async ({ params: { id } }) => CRUD.updateOne(id),
  deletePost: async ({ params: { id } }) => CRUD.deleteBy(id)!,
});
