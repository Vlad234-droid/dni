import faker from 'faker';
import { Emotion } from '@dni-connectors/colleague-cms-api';

import { generateArray } from '../../../utils';
import { generateEmoji } from '../emoji';
import { generateBase } from '../base';

const generateEmotion = () => {
  const emotion: Emotion = {
    ...generateBase(),
    count: faker.datatype.number(20),
    emoji: generateEmoji(),
  };

  return emotion;
};

const generateEmotions = (length: number) =>
  generateArray(length).map(() => generateEmotion());

export { generateEmotion, generateEmotions };
