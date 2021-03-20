import faker from 'faker';
import { Emotion, User } from '@dni-connectors/colleague-cms-api';

import { generateArray } from 'utils';
import { generateEmoji } from '../emoji';
import { generateBase } from '../base';
import { colleague } from '../../colleague';

const generateEmotion = () => {
  const emotion: Emotion = {
    ...generateBase(),
    count: faker.random.number(20),
    createdBy: colleague as User,
    emoji: generateEmoji(),
  };

  return emotion;
};

const generateEmotions = (length: number) =>
  generateArray(length).map(() => generateEmotion());

export { generateEmotion, generateEmotions };
