import faker from 'faker';
import { Emotion } from '@dni-connectors/colleague-cms-api';

import { file } from '../built-in';

export const emotion: Emotion = {
  id: faker.random.number(),
  count: faker.random.number(3),
  image: file,
};
