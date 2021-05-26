import { File } from '../built-in';
import { BaseType } from '../types';

type Emoji = {
  title: string;
  slug: string;
  image: File;
} & BaseType;

type EmojiApiParams = {
  id: string;
};

export type { Emoji, EmojiApiParams };
