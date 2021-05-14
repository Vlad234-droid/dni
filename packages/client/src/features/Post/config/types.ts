import { Post } from '@dni-connectors/colleague-cms-api';

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

const ALL = 'ALL';
const BY_EVENT = 'BY_EVENT';
const BY_NETWORK = 'BY_NETWORK';

type Filter = typeof ALL | typeof BY_NETWORK | typeof BY_EVENT;

export { PostStatus, ALL, BY_EVENT, BY_NETWORK };
export type { Post, Filter, Attachment };
