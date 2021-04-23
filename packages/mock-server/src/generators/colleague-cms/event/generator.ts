import faker from 'faker';
import { Event } from '@dni-connectors/colleague-cms-api';

import { generateArray, dateToIso } from '../../../utils';
import { generateBase } from '../base';
import { generateNetwork } from '../network';
import { generateFile } from '../built-in';

const generateEvent = () => {
  const event: Event = {
    ...generateBase(),
    title: faker.random.words(3),
    network: generateNetwork(),
    description: faker.random.words(10),
    maxParticipants: faker.datatype.number(999),
    startDate: dateToIso(new Date()),
    endDate: dateToIso(new Date()),
    surveryUrl: faker.internet.url(),
    slug: faker.random.words(2).replace(' ', '-').toLowerCase(),
    image: generateFile(),
  };

  return event;
};

const generateEvents = (length: number) =>
  generateArray(length).map(() => generateEvent());

export { generateEvent, generateEvents };
