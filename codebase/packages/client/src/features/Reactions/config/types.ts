import { ReactionsCount, ReactionType } from '@dni-connectors/colleague-cms-api';

enum Variant {
  HEART = 'heart',
  LAUGH = 'laugh',
  LIKE = 'like',
  SMILE = 'smile',
  SURPRISE = 'surprise',
}

type Emoji = {
  variant: Variant;
  image: File | string;
};

type ReactionsList = Record<Variant, number>;
type Reaction = {
  id: number;
  reactions: Variant[];
};

export { ReactionType };
export type { Emoji, ReactionsList, Reaction, ReactionsCount };
