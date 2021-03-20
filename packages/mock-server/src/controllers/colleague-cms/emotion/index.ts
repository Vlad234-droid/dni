import { createApiRouter } from '@energon/rest-api-provider';
import { cmsEmotionsApiDef, Emotion } from '@dni-connectors/colleague-cms-api';
import { buildCRUD } from 'utils';

import { generateEmotion, generateEmotions } from 'generators/colleague-cms';

const COLLECTION_SIZE = 20;

const CRUD = buildCRUD<Emotion>(
  () => generateEmotions(COLLECTION_SIZE),
  generateEmotion,
);

export const cmsEmotionsApiRouter = createApiRouter(cmsEmotionsApiDef)({
  postEmotion: async () => CRUD.createOne(),
  putEmotion: async ({ params: { id } }) => CRUD.updateOne(id),
  deleteEmotion: async ({ params: { id } }) => CRUD.deleteBy(id)!,
});
