import { File } from '../built-in';
import { Emotion } from '../emotion';
import { Network } from '../network';
import { Event } from '../event';
import { User } from '../user';
import { BaseApiParams, BaseType } from '../types';

type Status = 'archived' | 'published';

type Post = {
  title: string;
  attachments?: File[];
  description: string;
  postAs: Poster;
  sharedToken: string;
  slug: string;
  status: Status;
  emotions: Emotion[];
  createdBy: User;
} & BaseType;

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

type PostApiParams = {
  id: string;
} & BaseApiParams;

type PostBody = Omit<Post, 'id'>;

export type {
  Post,
  Poster,
  PostAsUser,
  PostAsNetwork,
  PostAsEvent,
  PostApiParams,
  PostBody,
};
