import faker from 'faker';
import { Emoji } from '@dni-connectors/colleague-cms-api';

import { generateArray } from 'utils';
import { generateFile } from '../built-in';
import { generateBase } from '../base';

const generateEmoji = () => {
  const emoji: Emoji = {
    ...generateBase(),
    image: generateFile(),
    title: faker.random.words(3),
    slug: faker.random.words(2).replace(' ', '-').toLowerCase(),
  };

  return emoji;
};

const generateEmojis = (length: number) =>
  generateArray(length).map(() => generateEmoji());

export { generateEmoji, generateEmojis };
