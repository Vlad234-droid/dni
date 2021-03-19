import { defineAPI } from '@energon/rest-api-definition';

import { Emotion, EmotionApiParams, EmotionBody } from './types';
import { buildApiConsumer, buildParams } from '../utils';
import { ColleagueCmsApiContext, ApiInput } from '../types';

export const cmsEmotionsApiDef = defineAPI((endpoint) => ({
  postEmotion: endpoint
    .post('/emotions')
    .params<EmotionApiParams>()
    .body<EmotionBody>()
    .response<Emotion>()
    .build(),

  putEmotion: endpoint
    .put('/emotions/:id')
    .params<EmotionApiParams>()
    .body<EmotionBody>()
    .response<Emotion>()
    .build(),

  deleteEmotion: endpoint
    .delete('/emotions/:id')
    .params<EmotionApiParams>()
    .response<Emotion>()
    .build(),
}));

export const cmsEmotionsApiConnector = (ctx: ColleagueCmsApiContext) => {
  const apiConsumer = buildApiConsumer(ctx, cmsEmotionsApiDef);

  return {
    postEmotion: async ({
      params,
      body,
      tenantkey,
    }: ApiInput<EmotionApiParams, EmotionBody>) =>
      apiConsumer.postEmotion(buildParams(params, tenantkey, body!)),

    putEmotion: async ({
      params,
      body,
      tenantkey,
    }: ApiInput<EmotionApiParams, EmotionBody>) =>
      apiConsumer.putEmotion(buildParams(params, tenantkey, body!)),

    deleteEmotion: ({
      params,
      tenantkey,
    }: ApiInput<Pick<EmotionApiParams, 'id'>>) =>
      apiConsumer.deleteEmotion(buildParams(params, tenantkey)),
  };
};

export type CmsEmotionsApi = ReturnType<typeof cmsEmotionsApiConnector>;
