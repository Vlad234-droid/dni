import { createApiRouter } from '@energon/rest-api-provider';
import { cmsPostsApiDef } from '@dni-connectors/colleague-cms-api';

import { post } from 'generators/colleague-cms';

const allPosts = {
  [post.id.toString()]: post,
};

export const cmsPostsApiRouter = createApiRouter(cmsPostsApiDef)({
  getPost: async ({ params: { id } }) => allPosts[id] || post,
});
