import { createApiRouter } from '@energon/rest-api-provider';
import { cmsEventsApiDef, Event } from '@dni-connectors/colleague-cms-api';
import { buildCRUD } from 'utils';

import { generateEvent, generateEvents } from 'generators/colleague-cms';

const COLLECTION_SIZE = 20;

const CRUD = buildCRUD<Event>(
  () => generateEvents(COLLECTION_SIZE),
  generateEvent,
);

export const cmsEventsApiRouter = createApiRouter(cmsEventsApiDef)({
  getEvents: async ({ params: { _start, _limit } }) =>
    CRUD.findAll(_start, _limit),
  getEventsCount: async () => COLLECTION_SIZE,
  getEvent: async ({ params: { id } }) => CRUD.findBy(id)! as Event,
  postEvent: async () => CRUD.createOne(),
  putEvent: async ({ params: { id } }) => CRUD.updateOne(id),
  deleteEvent: async ({ params: { id } }) => CRUD.deleteBy(id)!,
});
