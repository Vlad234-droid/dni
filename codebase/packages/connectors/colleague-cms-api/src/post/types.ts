import { File } from '../built-in';
import { Network } from '../network';
import { Event } from '../event';
import { BaseApiParams, BaseType } from '../types';
import { ReactionsCount } from '../reaction';

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
  reactions: ReactionsCount,
  shortDescription: string;
} & BaseType;

export type PostApiParams = {
  id: string;
  network_eq?: string;
  event_eq?: string;
} & BaseApiParams;

export type PostBody = Omit<Post, 'id'>;

export default Post;
