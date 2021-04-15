import faker from 'faker';
import { Post } from '@dni-connectors/colleague-cms-api';

import { generateArray } from 'utils';
import { generateFile } from '../built-in';
import { generateBase } from '../base';
import { generateNetwork } from '../network';
import { generateEvent } from '../event';

const generatePost = () => {
  const post: Post = {
    ...generateBase(),
    title: faker.random.words(3),
    attachments: [generateFile()],
    content: faker.random.words(10),
    slug: faker.random.words(2).replace(' ', '-').toLowerCase(),
    authorName: faker.name.firstName(),
    authorEmail: faker.internet.email(),
    anonymous: faker.random.boolean(),
    archived: faker.random.boolean(),
    event: faker.random.arrayElement([generateEvent(), undefined]),
    network: faker.random.arrayElement([generateNetwork(), undefined]),
  };

  return post;
};

const generatePosts = (length: number) =>
  generateArray(length).map(() => generatePost());

export { generatePost, generatePosts };
