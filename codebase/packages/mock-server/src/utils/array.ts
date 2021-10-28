import faker from 'faker';
import { ReactionType } from '@dni-connectors/colleague-cms-api';

const generateArray = (length: number) =>
  Array(length)
    .fill(null)
    .map((_, idx) => idx);

const randomArray = <T>(min: number, max: number, generator: () => T) => {
  const len = faker.datatype.number({ min, max });
  const array: Array<T> = [];

  for (let i = 0; i < len; ++i) {
    array[i] = generator();
  }

  return array;
};

const randomReactionType = () => {
  const reactionTypes = [ReactionType.SURPRISE, ReactionType.SMILE, ReactionType.LAUGH, ReactionType.LIKE, ReactionType.HEART];
  const min = 0;
  const max = reactionTypes.length - 1;
  const randomIndex = Math.floor(Math.random() * (max + 1) + min);

  return reactionTypes[randomIndex];
}

export { generateArray, randomArray, randomReactionType };
