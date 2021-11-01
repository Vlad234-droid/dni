import { defineAPI } from '@energon/rest-api-definition';

import { Reaction, Reactions, ReactionApiParams, ReactionBody, ReactionsCount } from './types';
import { buildApiConsumer, buildParams } from '../utils';
import { DniCmsApiContext, ApiInput } from '../types';

export const cmsReactionsApiDef = defineAPI((endpoint) => ({
  getReactionsCount: endpoint
    .get('/reactions/:parentId/:relatedType/count')
    .params<Pick<ReactionApiParams, 'parentId' | 'contentType'>>()
    .response<ReactionsCount>()
    .build(),

  getReactions: endpoint
    .get('/reactions/external/:authorQuery')
    .params<Pick<ReactionApiParams, 'authorQuery' | 'reactionType' | 'contentType' | 'authorField'>>()
    .response<Reactions>()
    .build(),

  postReaction: endpoint.post('/reactions').body<ReactionBody>().response<Reaction>().build(),

  deleteReaction: endpoint
    .delete('/reactions/external/:reactionId')
    .params<Pick<ReactionApiParams, 'authorQuery' | 'authorField'>>()
    .response<Reaction>()
    .build(),
}));

export const cmsReactionsApiConnector = (ctx: DniCmsApiContext) => {
  const apiConsumer = buildApiConsumer(ctx, cmsReactionsApiDef);

  return {
    getReactionsCount: async ({ params }: ApiInput<Pick<ReactionApiParams, 'parentId' | 'contentType'>>) =>
      await apiConsumer.getReactionsCount(buildParams(params)),

    getReactions: async ({
      params,
    }: ApiInput<Pick<ReactionApiParams, 'authorQuery' | 'reactionType' | 'contentType' | 'authorField'>>) =>
      await apiConsumer.getReactions(buildParams(params)),

    postReaction: async ({ body }: { body: ReactionBody }) => await apiConsumer.postReaction(buildParams({}, body!)),

    deleteReaction: async ({ params }: ApiInput<Pick<ReactionApiParams, 'authorQuery' | 'authorField'>>) =>
      await apiConsumer.deleteReaction(buildParams(params)),
  };
};

export type CmsReactionsApi = ReturnType<typeof cmsReactionsApiConnector>;
