import faker from 'faker';

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

export { generateArray, randomArray };
