import { createApiRouter } from '@energon/rest-api-provider';
import { cmsEmotionsApiDef } from '@dni-connectors/colleague-cms-api';
import { buildEmotionCRUD } from 'crud';

const COLLECTION_SIZE = 20;
const CRUD = buildEmotionCRUD(COLLECTION_SIZE);

export const cmsEmotionsApiRouter = createApiRouter(cmsEmotionsApiDef)({
  postEmotion: async () => CRUD.createOne(),
  putEmotion: async ({ params: { id } }) => CRUD.updateOne(id),
  deleteEmotion: async ({ params: { id } }) => CRUD.deleteBy(id)!,
});
