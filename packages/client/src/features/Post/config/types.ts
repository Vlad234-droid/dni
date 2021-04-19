// import { Network } from 'features/Network';
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

type Filter = 'ALL' | 'BY_EVENT' | 'BY_NETWORK';

export { PostStatus };
export type { Post, Filter, Attachment };
