import faker from 'faker';
import { Reaction, ContentType } from '@dni-connectors/colleague-cms-api';

import { randomReactionType } from '../../../utils';
import { generateBase } from '../base';

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

export { generateReaction };
