import { defineAPI } from '@energon/rest-api-definition';

import { Event, EventApiParams, EventBody } from './types';
import { buildApiConsumer, buildParams, buildFetchClient, buildFetchParams } from '../utils';
import { ColleagueCmsApiContext, ApiInput } from '../types';

export const cmsEventsApiDef = defineAPI((endpoint) => ({
  getEventsCount: endpoint
    .get('/events/count')
    .params<EventApiParams>()
    .response<number>()
    .build(),

  getEvent: endpoint
    .get('/events/:id')
    .params<Pick<EventApiParams, 'id'>>()
    .response<Event>()
    .build(),

  getEvents: endpoint
    .get('/events')
    .params<Omit<EventApiParams, 'id'>>()
    .response<Event[]>()
    .build(),

  postEvent: endpoint
    .post('/events')
    .params<EventApiParams>()
    .body<EventBody>()
    .response<Event>()
    .build(),

  putEvent: endpoint
    .put('/events/:id')
    .params<Pick<EventApiParams, 'id'>>()
    .body<EventBody>()
    .response<Event>()
    .build(),

  deleteEvent: endpoint
    .delete('/events/:id')
    .params<Pick<EventApiParams, 'id'>>()
    .response<Event>()
    .build(),
}));

export const cmsEventsApiConnector = (ctx: ColleagueCmsApiContext) => {
  const apiConsumer = buildApiConsumer(ctx, cmsEventsApiDef);
  const fetchClient = buildFetchClient(ctx);

  return {
    getEvent: async ({ params }: ApiInput<EventApiParams>) => await apiConsumer.getEvent(buildParams(params)),

    getEvents: async ({ params }: ApiInput<Omit<EventApiParams, 'id'>>) =>
      await fetchClient<Event[]>(cmsEventsApiDef.getEvents, params, buildFetchParams()),

    getEventsCount: async ({ params }: ApiInput<Omit<EventApiParams, 'id'>>) =>
      await fetchClient<number>(cmsEventsApiDef.getEventsCount, params, buildFetchParams()),

    postEvent: async ({ params, body }: ApiInput<EventApiParams, EventBody>) =>
      await apiConsumer.postEvent(buildParams(params, body!)),

    putEvent: async ({ params, body }: ApiInput<EventApiParams, EventBody>) =>
      await apiConsumer.putEvent(buildParams(params, body!)),

    deleteEvent: async ({ params }: ApiInput<Pick<EventApiParams, 'id'>>) =>
      await apiConsumer.deleteEvent(buildParams(params)),
  };
};

export type CmsEventsApi = ReturnType<typeof cmsEventsApiConnector>;
