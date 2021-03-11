import faker from 'faker';
import { Post, User } from '@dni-connectors/colleague-cms-api';

import { dateToFormat, DATE_TIME_FORMAT } from 'utils/date';
import { file } from '../built-in';
import { emotion } from '../emotion';
import { colleague } from '../../colleague';

const Status = ['archived', 'published'] as const;

const user = colleague as User;

const poster: Post['postAs'] = {
  __component: 'post-as.user',
  user,
};

const post: Post = {
  id: faker.random.number(),
  title: faker.random.words(3),
  attachments: [file],
  description: faker.random.words(10),
  postAs: poster,
  sharedToken: faker.random.word().toLowerCase(),
  slug: faker.random.words(2).replace(' ', '-').toLowerCase(),
  status: faker.random.arrayElement(Status),
  emotions: [emotion],
  createdBy: user,
  createAt: dateToFormat(new Date(), DATE_TIME_FORMAT),
  updateAt: dateToFormat(new Date(), DATE_TIME_FORMAT),
};

export { post, poster };
