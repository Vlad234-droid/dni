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

const ALL = 'ALL';
const YOUR_NETWORKS = 'YOUR_NETWORKS';

type Filter = typeof ALL | typeof YOUR_NETWORKS;

export { ALL, YOUR_NETWORKS };
export type { FormData, Names, Filter };
