import { Post } from 'features/Post';

interface FormData {
  image?: File;
  title: string;
  email: string;
  manager: string;
  description?: string;
  partnership?: Array<string | undefined>;
}

export default interface Network extends FormData {
  id: number;
  posts: Array<Post>;
}

type Names = keyof FormData;

type Filter = 'ALL' | 'YOUR_NETWORKS';

export type { FormData, Names, Filter };
