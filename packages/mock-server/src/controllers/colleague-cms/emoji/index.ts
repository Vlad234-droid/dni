import { createApiRouter } from '@energon/rest-api-provider';
import { cmsEmojisApiDef, Emoji } from '@dni-connectors/colleague-cms-api';
import { buildEmojiCRUD } from 'crud';

const COLLECTION_SIZE = 5;

const CRUD = buildEmojiCRUD(COLLECTION_SIZE);

export const cmsEmojisApiRouter = createApiRouter(cmsEmojisApiDef)({
  getEmojis: async () => CRUD.findAll(),
  getEmoji: async ({ params: { id } }) => CRUD.findBy(id)! as Emoji,
});
