import { defineAPI } from '@energon/rest-api-definition';

import { Post, PostApiParams, PostBody } from './types';
import { buildApiConsumer, buildParams, buildFetchClient, buildFetchParams } from '../utils';
import { DniCmsApiContext, ApiInput } from '../types';

export const cmsPostsApiDef = defineAPI((endpoint) => ({
  getPostsCount: endpoint.get('/posts/count').params<Omit<PostApiParams, 'id'>>().response<number>().build(),

  getPost: endpoint.get('/posts/:id').params<Pick<PostApiParams, 'id'>>().response<Post>().build(),

  getPosts: endpoint.get('/posts').params<Omit<PostApiParams, 'id'>>().response<Post[]>().build(),

  postPost: endpoint.post('/posts').params<PostApiParams>().body<PostBody>().response<Post>().build(),

  putPost: endpoint.put('/posts/:id').params<Pick<PostApiParams, 'id'>>().body<PostBody>().response<Post>().build(),

  deletePost: endpoint.delete('/posts/:id').params<Pick<PostApiParams, 'id'>>().response<Post>().build(),
}));

export const cmsPostsApiConnector = (ctx: DniCmsApiContext) => {
  const apiConsumer = buildApiConsumer(ctx, cmsPostsApiDef);
  const fetchClient = buildFetchClient(ctx);

  return {
    getPost: async ({ params }: ApiInput<PostApiParams>) => apiConsumer.getPost(buildParams(params)),

    getPosts: ({ params }: ApiInput<Omit<PostApiParams, 'id'>>) =>
      fetchClient<Post[]>(cmsPostsApiDef.getPosts, params, buildFetchParams()),

    getPostsCount: ({ params }: ApiInput<Omit<PostApiParams, 'id'>>) =>
      fetchClient<number>(cmsPostsApiDef.getPostsCount, params, buildFetchParams()),

    postPost: async ({ params, body }: ApiInput<PostApiParams, PostBody>) =>
      apiConsumer.postPost(buildParams(params, body!)),

    putPost: async ({ params, body }: ApiInput<PostApiParams, PostBody>) =>
      apiConsumer.putPost(buildParams(params, body!)),

    deletePost: ({ params }: ApiInput<Pick<PostApiParams, 'id'>>) => apiConsumer.deletePost(buildParams(params)),
  };
};

export type CmsPostsApi = ReturnType<typeof cmsPostsApiConnector>;
