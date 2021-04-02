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
}

type Names = keyof FormData;

type Filter = 'ALL' | 'YOUR_NETWORKS' | 'YOU_MANAGE';

export type { FormData, Names, Filter };
