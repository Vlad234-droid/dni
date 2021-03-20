import { createApiRouter } from '@energon/rest-api-provider';
import { cmsEmojisApiDef, Emoji } from '@dni-connectors/colleague-cms-api';
import { buildCRUD } from 'utils';

import { generateEmoji, generateEmojis } from 'generators/colleague-cms';

const COLLECTION_SIZE = 5;

const CRUD = buildCRUD<Emoji>(
  () => generateEmojis(COLLECTION_SIZE),
  generateEmoji,
);

export const cmsEmojisApiRouter = createApiRouter(cmsEmojisApiDef)({
  getEmojis: async () => CRUD.findAll(),
  getEmoji: async ({ params: { id } }) => CRUD.findBy(id)! as Emoji,
});
