import { Post } from '@dni-connectors/colleague-cms-api';

import { ALL, BY_EVENT, BY_NETWORK } from './constants';

enum PostStatus {
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

type Attachment = {
  alternativeText: string;
  caption: string;
  ext: string;
  height: number;
  id: number;
  mime: string;
  name: string;
  previewUrl: string | null;
  size: number;
  url: string;
  width: number;
};

type Filter = typeof ALL | typeof BY_NETWORK | typeof BY_EVENT;

export { PostStatus };
export type { Post, Filter, Attachment };
