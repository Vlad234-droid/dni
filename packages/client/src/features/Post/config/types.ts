import { User } from 'features/User';
// import { Network } from 'features/Network';
import { Emotion } from '../components/PostEmotions';

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

type Post = {
  id: number | string;
  title: string;
  attachments?: Attachment[];
  description: string;
  postAs: Poster;
  sharedToken: string;
  slug: string;
  status: PostStatus;
  emotions: Emotion[];
  createdBy: User;
  created_at: string;
  updated_at: string;
};

type Poster = PostAsUser | PostAsNetwork | PostAsEvent | null;

type PostAsUser = {
  __component: 'post-as.user';
  user: User;
};

type PostAsEvent = {
  __component: 'post-as.event';
  event: Event;
};

type PostAsNetwork = {
  __component: 'post-as.network';
  network: any;
};

type Filter = 'ALL' | 'BY_EVENT' | 'BY_NETWORK';

export { PostStatus };
export type { Post, Filter, Attachment };
