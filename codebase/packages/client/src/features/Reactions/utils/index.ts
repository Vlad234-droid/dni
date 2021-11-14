import { EntityType } from 'types/entity';

import { ContentType, ReactionBody, ReactionType } from '../config/types';

export const getAddReactionFilters = ({ type, entityId, entityType, uuid }: { type: ReactionType, entityId: number, entityType: EntityType, uuid: string }): ReactionBody => ({
  type,
  parent: {
    relatedId: entityId,
    relatedType: ContentType[entityType.toUpperCase()],
  },
  externalAuthor: {
    name: uuid,
    email: `${uuid}@tesco.com`,
    externalId: uuid,
  },
});
