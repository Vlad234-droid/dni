import { Emoji } from '../emoji';
import { BaseType } from '../types';

export type Emotion = {
  count: number;
  emoji: Emoji;
} & BaseType;

export type EmotionApiParams = {
  id: string;
};

export type EmotionBody = Omit<Emotion, 'id'>;

export default Emotion;
