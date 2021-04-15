import { File } from '../built-in';
import { Network } from '../network';
import { Event } from '../event';
import { BaseApiParams, BaseType } from '../types';

type Post = {
  title: string;
  content: string;
  slug: string;
  authorName: string;
  authorEmail: string;
  anonymous: boolean;
  archived: boolean;
  event?: Event;
  network?: Network;
  attachments?: File[];
} & BaseType;

type PostApiParams = {
  id: string;
} & BaseApiParams;

type PostBody = Omit<Post, 'id'>;

export type { Post, PostApiParams, PostBody };
