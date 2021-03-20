import faker from 'faker';
import { dateToFormat, DATE_TIME_FORMAT } from 'utils';

const generateBase = () => {
  const base = {
    id: faker.random.number(),
    created_at: dateToFormat(new Date(), DATE_TIME_FORMAT),
    updated_at: dateToFormat(new Date(), DATE_TIME_FORMAT),
  };

  return base;
};

export { generateBase };
