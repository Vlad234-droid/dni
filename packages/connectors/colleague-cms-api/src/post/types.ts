import { File, Status } from '../built-in';
import { Emotion } from '../emotion';
import { Network } from '../network';
import { Event } from '../event';
import { User } from '../user';
import { BaseApiParams, BaseType } from '../types';

type Post = {
  title: string;
  attachments?: File[];
  description: string;
  postAs: Poster[];
  sharedToken: string;
  slug: string;
  status: Status;
  emotions: Emotion[];
  createdBy: User;
} & BaseType;

type Poster = PostAsUser | PostAsNetwork | PostAsEvent | null;

enum Component {
  EVENT = 'poster.event',
  USER = 'poster.user',
  NETWORK = 'poster.network',
}

type PostAsUser = {
  __component: Component.USER;
  user: User;
};

type PostAsNetwork = {
  __component: Component.NETWORK;
  network: Network;
};

type PostAsEvent = {
  __component: Component.EVENT;
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

export { Component };
