import { defineAPI } from '@energon/rest-api-definition';

import { Event, EventApiParams, EventBody } from './types';
import { buildApiConsumer, buildParams, buildFetchClient, buildFetchParams } from '../utils';
import { DniCmsApiContext, ApiInput } from '../types';

export const cmsEventsApiDef = defineAPI((endpoint) => ({
  getEventsCount: endpoint.get('/events/count').params<EventApiParams>().response<number>().build(),

  getEvent: endpoint.get('/events/:id').params<Pick<EventApiParams, 'id'>>().response<Event>().build(),

  getEvents: endpoint.get('/events').params<Omit<EventApiParams, 'id'>>().response<Event[]>().build(),

  postEvent: endpoint.post('/events').params<EventApiParams>().body<EventBody>().response<Event>().build(),

  putEvent: endpoint
    .put('/events/:id')
    .params<Pick<EventApiParams, 'id'>>()
    .body<EventBody>()
    .response<Event>()
    .build(),

  deleteEvent: endpoint.delete('/events/:id').params<Pick<EventApiParams, 'id'>>().response<Event>().build(),
}));

export const cmsEventsApiConnector = (ctx: DniCmsApiContext) => {
  const apiConsumer = buildApiConsumer(ctx, cmsEventsApiDef);
  const fetchClient = buildFetchClient(ctx);

  return {
    getEvent: async ({ params, tenantkey }: ApiInput<EventApiParams>) =>
      apiConsumer.getEvent(buildParams(params, tenantkey)),

    getEvents: ({ params, tenantkey }: ApiInput<Omit<EventApiParams, 'id'>>) =>
      fetchClient<Event[]>(cmsEventsApiDef.getEvents, params, buildFetchParams(tenantkey)),

    getEventsCount: ({ params, tenantkey }: ApiInput<Omit<EventApiParams, 'id'>>) =>
      fetchClient<number>(cmsEventsApiDef.getEventsCount, params, buildFetchParams(tenantkey)),

    postEvent: async ({ params, body, tenantkey }: ApiInput<EventApiParams, EventBody>) =>
      apiConsumer.postEvent(buildParams(params, tenantkey, body!)),

    putEvent: async ({ params, body, tenantkey }: ApiInput<EventApiParams, EventBody>) =>
      apiConsumer.putEvent(buildParams(params, tenantkey, body!)),

    deleteEvent: ({ params, tenantkey }: ApiInput<Pick<EventApiParams, 'id'>>) =>
      apiConsumer.deleteEvent(buildParams(params, tenantkey)),
  };
};

export type CmsEventsApi = ReturnType<typeof cmsEventsApiConnector>;
