import { Emoji } from '../emoji';
import { User } from '../user';
import { BaseType } from '../types';

type Emotion = {
  count: number;
  emoji: Emoji;
  createdBy: User;
} & BaseType;

type EmotionApiParams = {
  id: string;
};

type EmotionBody = Omit<Emotion, 'id'>;

export type { Emotion, EmotionApiParams, EmotionBody };
