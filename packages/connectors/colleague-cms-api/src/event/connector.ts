import { defineAPI } from '@energon/rest-api-definition';

import { Event, EventApiParams } from './types';
import { buildApiConsumer } from '../utils';
import { ColleagueCmsApiContext } from '../types';

type HandlerInput = {
  params: EventApiParams;
};

export const cmsEventsApiDef = defineAPI((endpoint) => ({
  getEvent: endpoint
    .get('/events/:id')
    .params<EventApiParams>()
    .response<Event>()
    .build(),
  // TODO: add another methods
}));

export const cmsEventsApiConnector = (ctx: ColleagueCmsApiContext) => {
  const apiConsumer = buildApiConsumer(ctx, cmsEventsApiDef);

  return {
    getEvent: async ({ params }: HandlerInput) =>
      apiConsumer.getEvent({
        params,
      }),
  };
};

export type CmsEventsApi = ReturnType<typeof cmsEventsApiConnector>;
