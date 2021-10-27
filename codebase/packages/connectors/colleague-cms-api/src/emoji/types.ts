import { File } from '../built-in';
import { BaseType } from '../types';

export type Emoji = {
  title: string;
  type: string;
  icon: File;
} & BaseType;

export type EmojiApiParams = {
  id: string;
};

export type EmojiBody = Omit<Emoji, 'id'>;

export default Emoji;
