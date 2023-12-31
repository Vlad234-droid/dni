import { defineAPI } from '@energon/rest-api-definition';

import { Emoji, EmojiApiParams } from './types';
import { buildApiConsumer, buildParams } from '../utils';
import { ColleagueCmsApiContext, ApiInput } from '../types';

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

export const cmsEmojisApiConnector = (ctx: ColleagueCmsApiContext) => {
  const apiConsumer = buildApiConsumer(ctx, cmsEmojisApiDef);

  return {
    getEmoji: async ({ params }: ApiInput<EmojiApiParams>) => await apiConsumer.getEmoji(buildParams(params)),

    getEmojis: async ({ params }: ApiInput<EmojiApiParams>) => await apiConsumer.getEmojis(buildParams(params)),
  };
};

export type CmsEmojisApi = ReturnType<typeof cmsEmojisApiConnector>;
