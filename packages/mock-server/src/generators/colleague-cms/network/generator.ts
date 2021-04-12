import faker from 'faker';
import { Network, User } from '@dni-connectors/colleague-cms-api';

import { generateArray } from 'utils';
import { generateFile, Status } from '../built-in';
import { generateOrganizations } from '../organization';
import { colleague } from '../../colleague';
import { generateBase } from '../base';

const user = colleague as User;

const generateNetwork = () => {
  const network: Network = {
    ...generateBase(),
    title: faker.random.words(3),
    description: faker.random.words(10),
    parent: null,
    slug: faker.random.words(2).replace(' ', '-').toLowerCase(),
    image: generateFile(),
    managerEmail: faker.internet.email(),
    managers: [user],
    partnerships: generateOrganizations(6),
    status: faker.random.arrayElement(Status),
    isPublished: true,
    children: [],
    questions: [],
    createdBy: user,
  };

  return network;
};

const generateNetworks = (length: number) =>
  generateArray(length).map(() => generateNetwork());

export { generateNetwork, generateNetworks };
