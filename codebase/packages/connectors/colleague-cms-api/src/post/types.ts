import { File } from '../built-in';
import { Network } from '../network';
import { Event } from '../event';
import { BaseApiParams, BaseType } from '../types';

export type Post = {
  title: string;
  content: string;
  slug: string;
  authorName?: string;
  authorEmail?: string;
  anonymous: boolean;
  archived: boolean;
  event?: Event;
  network?: Network;
  attachments?: File[];
} & BaseType;

export type PostApiParams = {
  id: string;
  network_eq?: string;
  event_eq?: string;
} & BaseApiParams;

export type PostBody = Omit<Post, 'id'>;

export default Post;
