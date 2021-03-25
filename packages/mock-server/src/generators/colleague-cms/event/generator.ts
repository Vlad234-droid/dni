import faker from 'faker';
import { Event, User } from '@dni-connectors/colleague-cms-api';

import { generateArray, dateToIso } from 'utils';
import { generateBase } from '../base';
import { generateNetwork } from '../network';
import { colleague } from '../../colleague';
import { generateFile } from '../built-in';

const user = colleague as User;

const generateEvent = () => {
  const event: Event = {
    ...generateBase(),
    title: faker.random.words(3),
    network: generateNetwork(),
    description: faker.random.words(10),
    maxParticipants: faker.random.number(999),
    startedAt: dateToIso(new Date()),
    finishedAt: dateToIso(new Date()),
    surveyLink: faker.internet.url(),
    slug: faker.random.words(2).replace(' ', '-').toLowerCase(),
    image: generateFile(),
    createdBy: user,
  };

  return event;
};

const generateEvents = (length: number) =>
  generateArray(length).map(() => generateEvent());

export { generateEvent, generateEvents };
