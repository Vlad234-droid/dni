import { defineAPI } from '@energon/rest-api-definition';

import { Emoji, EmojiApiParams } from './types';
import { buildApiConsumer, buildParams } from '../utils';
import { DniCmsApiContext, ApiInput } from '../types';

export const cmsEmojisApiDef = defineAPI((endpoint) => ({
  getEmoji: endpoint
    .get('/emojis/:id')
    .params<Pick<EmojiApiParams, 'id'>>()
    .response<Emoji>()
    .build(),

  getEmojis: endpoint
    .get('/emojis')
    .params<EmojiApiParams>()
    .response<Emoji[]>()
    .build(),
}));

export const cmsEmojisApiConnector = (ctx: DniCmsApiContext) => {
  const apiConsumer = buildApiConsumer(ctx, cmsEmojisApiDef);

  return {
    getEmoji: async ({ params }: ApiInput<EmojiApiParams>) =>
      apiConsumer.getEmoji(buildParams(params)),

    getEmojis: ({ params }: ApiInput<EmojiApiParams>) =>
      apiConsumer.getEmojis(buildParams(params)),
  };
};

export type CmsEmojisApi = ReturnType<typeof cmsEmojisApiConnector>;
