import { createApiRouter } from '@energon/rest-api-provider';
import { cmsEventsApiDef, Event } from '@dni-connectors/colleague-cms-api';
import { buildEventCRUD } from 'crud';

const COLLECTION_SIZE = 60;
const CRUD = buildEventCRUD(COLLECTION_SIZE);

export const cmsEventsApiRouter = createApiRouter(cmsEventsApiDef)({
  getEvents: async ({ params: { _start, _limit } }) =>
    CRUD.findAll(_start, _limit),
  getEventsCount: async () => CRUD.count(),
  getEvent: async ({ params: { id } }) => CRUD.findBy(id)! as Event,
  postEvent: async () => CRUD.createOne(),
  putEvent: async ({ params: { id } }) => CRUD.updateOne(id),
  deleteEvent: async ({ params: { id } }) => CRUD.deleteBy(id)!,
});
