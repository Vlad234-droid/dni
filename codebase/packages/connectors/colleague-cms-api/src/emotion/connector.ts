import { defineAPI } from '@energon/rest-api-definition';

import { Emotion, EmotionApiParams, EmotionBody } from './types';
import { buildApiConsumer, buildParams } from '../utils';
import { DniCmsApiContext, ApiInput } from '../types';

export const cmsEmotionsApiDef = defineAPI((endpoint) => ({
  postEmotion: endpoint.post('/emotions').params<EmotionApiParams>().body<EmotionBody>().response<Emotion>().build(),

  putEmotion: endpoint.put('/emotions/:id').params<EmotionApiParams>().body<EmotionBody>().response<Emotion>().build(),

  deleteEmotion: endpoint.delete('/emotions/:id').params<EmotionApiParams>().response<Emotion>().build(),
}));

export const cmsEmotionsApiConnector = (ctx: DniCmsApiContext) => {
  const apiConsumer = buildApiConsumer(ctx, cmsEmotionsApiDef);

  return {
    postEmotion: async ({ params, body }: ApiInput<EmotionApiParams, EmotionBody>) =>
      await apiConsumer.postEmotion(buildParams(params, body!)),

    putEmotion: async ({ params, body }: ApiInput<EmotionApiParams, EmotionBody>) =>
      await apiConsumer.putEmotion(buildParams(params, body!)),

    deleteEmotion: async ({ params }: ApiInput<Pick<EmotionApiParams, 'id'>>) =>
      await apiConsumer.deleteEmotion(buildParams(params)),
  };
};

export type CmsEmotionsApi = ReturnType<typeof cmsEmotionsApiConnector>;
