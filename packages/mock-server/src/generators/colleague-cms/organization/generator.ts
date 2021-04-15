import faker from 'faker';
import { Organization } from '@dni-connectors/colleague-cms-api';

import { generateArray, buildFullUrl } from 'utils';
import { generateFile } from '../built-in';
import { generateBase } from '../base';

const images = ['partner-1.png', 'partner-2.png', 'partner-3.png'];

const generateOrganization = () => {
  const organization: Organization = {
    ...generateBase(),
    image: generateFile(buildFullUrl(faker.random.arrayElement(images))),
    title: faker.random.words(3),
    link: faker.internet.url(),
  };

  return organization;
};

const generateOrganizations = (length: number) =>
  generateArray(length).map(() => generateOrganization());

export { generateOrganization, generateOrganizations };
