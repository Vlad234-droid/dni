import { EntityType } from 'types/entity';

import { getAddReactionFilters } from './index';
import { ContentType, ReactionType } from '../config/types';

describe('#Reactions utils', () => {
  describe('getAddReactionFilters', () => {
    it('should return expected object filled with data', () => {
      const data = {
        type: ReactionType.HEART,
        entityId: 234567,
        entityType: EntityType.POST,
        uuid: 'mocked-uuid',
      };

      const expected = {
        type: ReactionType.HEART,
        parent: {
          relatedId: 234567,
          relatedType: ContentType.POST,
        },
        externalAuthor: {
          name: 'mocked-uuid',
          email: 'mocked-uuid@tesco.com',
          externalId: 'mocked-uuid',
        },
      };

      expect(getAddReactionFilters(data)).toEqual(expected);
    });
  });
});