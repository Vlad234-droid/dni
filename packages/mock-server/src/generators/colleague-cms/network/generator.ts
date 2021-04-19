import faker from 'faker';
import { Network } from '@dni-connectors/colleague-cms-api';

import { generateArray } from 'utils';
import { generateFile } from '../built-in';
import { generateOrganizations } from '../organization';
import { generateBase } from '../base';

const generateNetwork = () => {
  const network: Network = {
    ...generateBase(),
    title: faker.random.words(3),
    description: faker.random.words(10),
    slug: faker.random.words(2).replace(' ', '-').toLowerCase(),
    image: generateFile(),
    contact: faker.internet.email(),
    partners: generateOrganizations(4),
    questions: [],
  };

  return network;
};

const generateNetworks = (length: number) =>
  generateArray(length).map(() => generateNetwork());

export { generateNetwork, generateNetworks };
