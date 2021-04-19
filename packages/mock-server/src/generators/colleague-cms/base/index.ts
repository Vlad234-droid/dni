import faker from 'faker';
import { dateToIso } from 'utils';

const generateBase = () => {
  const base = {
    id: faker.random.number(),
    created_at: dateToIso(new Date()),
    updated_at: dateToIso(new Date()),
    published_at: dateToIso(new Date()),
  };

  return base;
};

export { generateBase };
