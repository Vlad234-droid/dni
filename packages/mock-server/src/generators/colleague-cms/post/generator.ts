import faker from 'faker';
import { Post, User } from '@dni-connectors/colleague-cms-api';

import { generateArray } from 'utils';
import { generateFile } from '../built-in';
import { generateEmotions } from '../emotion';
import { colleague } from '../../colleague';
import { generateBase } from '../base';

const Status = ['archived', 'published'] as const;

const user = colleague as User;

const poster: Post['postAs'] = {
  __component: 'post-as.user',
  user,
};

const generatePost = () => {
  const post: Post = {
    ...generateBase(),
    title: faker.random.words(3),
    attachments: [generateFile()],
    description: faker.random.words(10),
    postAs: poster,
    sharedToken: faker.random.word().toLowerCase(),
    slug: faker.random.words(2).replace(' ', '-').toLowerCase(),
    status: faker.random.arrayElement(Status),
    emotions: generateEmotions(2),
    createdBy: user,
  };

  return post;
};

const generatePosts = (length: number) =>
  generateArray(length).map(() => generatePost());

export { generatePost, generatePosts, poster };
