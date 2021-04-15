import { Emoji } from '../emoji';
import { BaseType } from '../types';

type Emotion = {
  count: number;
  emoji: Emoji;
} & BaseType;

type EmotionApiParams = {
  id: string;
};

type EmotionBody = Omit<Emotion, 'id'>;

export type { Emotion, EmotionApiParams, EmotionBody };
