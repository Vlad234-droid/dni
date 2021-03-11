import { defineAPI } from '@energon/rest-api-definition';

import { Post, PostApiParams } from './types';
import { buildApiConsumer } from '../utils';
import { ColleagueCmsApiContext } from '../types';

type HandlerInput = {
  params: PostApiParams;
};

export const cmsPostsApiDef = defineAPI((endpoint) => ({
  getPost: endpoint
    .get('/posts/:id')
    .params<PostApiParams>()
    .response<Post>()
    .build(),
  // TODO: add another methods
}));

export const cmsPostsApiConnector = (ctx: ColleagueCmsApiContext) => {
  const apiConsumer = buildApiConsumer(ctx, cmsPostsApiDef);

  return {
    getPost: async ({ params }: HandlerInput) =>
      apiConsumer.getPost({
        params,
      }),
  };
};

export type CmsPostsApi = ReturnType<typeof cmsPostsApiConnector>;
