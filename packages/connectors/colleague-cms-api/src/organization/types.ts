import { File } from '../built-in';

export type Organization = {
  id: number;
  title: string;
  image: File | null;
};
