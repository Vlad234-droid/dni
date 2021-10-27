import faker from 'faker';
import { Reaction, ContentType, ReactionType } from '@dni-connectors/colleague-cms-api';

import { randomReactionType } from '../../../utils';
import {generateBase} from '../base';

const generateReaction = () => {
  const reaction: Reaction = {
    ...generateBase(),
    type: randomReactionType(),
    parent: {
      id: faker.datatype.number(),
      relatedId: faker.datatype.number(),
      relatedType: ContentType.POST,
    },
    externalAuthor: {
      email: 'mocked@tesco.com',
      username: 'mocked',
      id: faker.datatype.number(),
    },
  };

  return reaction;
};

const generateReactions = () => ({
  [ReactionType.HEART]: [generateReaction],
  [ReactionType.LIKE]: [generateReaction],
  [ReactionType.LAUGH]: [generateReaction],
  [ReactionType.SMILE]: [generateReaction],
  [ReactionType.SURPRISE]: [generateReaction],
});

export { generateReaction, generateReactions };
