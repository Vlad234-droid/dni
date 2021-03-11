enum PostStatus {
  EDITING = 'EDITING',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

type User = {
  name: string;
  avatarSrc: string;
};

enum AttachmentStatus {
  INIT = 'init',
  ERROR = 'error',
  LOADING = 'loading',
  SUCCESS = 'success',
}

type Attachment = {
  format: string;
  name: string;
  path: string;
  progress: number;
  status: AttachmentStatus;
};

type Emotion = {
  id: number | string;
  name: string;
  count: number;
  // image: File;
  image: string;
};

type Post = {
  id: number;
  slug: string;
  title: string;
  postAs: string;
  status: PostStatus;
  attachments: Attachment[];
  description: string;
  sharedToken: string;
  emotions: Emotion[];
  createdBy: User;
  createdAt: string;
  updatedAt: string;
};

type PostForm = {
  id: number;
  title: string;
  attachments: Attachment[];
  createdBy: User;
  description: string;
};

export { PostStatus, AttachmentStatus };
export type { User, Post, Emotion, PostForm, Attachment };
