import { File, DateString } from '../built-in';
import { Emotion } from '../emotion';
import { Network } from '../network';
import { Event } from '../event';
import { User } from '../user';

type PostApiParams = {
  id: string;
};

type Status = 'archived' | 'published';

type Post = {
  id: number;
  title: string;
  attachments: File[];
  description: string;
  postAs: Poster;
  sharedToken: string;
  slug: string;
  status: Status;
  emotions: Emotion[];
  createdBy: User;
  createAt: DateString;
  updateAt: DateString;
};

type Poster = PostAsUser | PostAsNetwork | PostAsEvent | null;

type PostAsUser = {
  __component: 'post-as.user';
  user: User;
};

type PostAsNetwork = {
  __component: 'post-as.network';
  network: Network;
};

type PostAsEvent = {
  __component: 'post-as.event';
  event: Event;
};

export type {
  PostApiParams,
  Post,
  Poster,
  PostAsUser,
  PostAsNetwork,
  PostAsEvent,
};
