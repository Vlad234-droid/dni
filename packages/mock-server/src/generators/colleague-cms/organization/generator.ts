import faker from 'faker';
import { Organization } from '@dni-connectors/colleague-cms-api';

import { generateArray } from 'utils';
import { generateFile } from '../built-in';
import { generateBase } from '../base';

const generateOrganization = () => {
  const organization: Organization = {
    ...generateBase(),
    image: generateFile(),
    title: faker.random.words(3),
    link: faker.internet.url(),
  };

  return organization;
};

const generateOrganizations = (length: number) =>
  generateArray(length).map(() => generateOrganization());

export { generateOrganization, generateOrganizations };
