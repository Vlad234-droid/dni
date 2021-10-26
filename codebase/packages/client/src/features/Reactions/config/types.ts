import {
  ReactionsCount,
  ReactionType,
  ContentType,
  ReactionBody,
  Reactions,
  Reaction,
  ReactionApiParams,
} from '@dni-connectors/colleague-cms-api';

type EmojiIcon = {
  active: string;
  default: string;
};

type ExtraReaction = Reaction & { reactionId: number };

export { ReactionType, ContentType };
export type { ReactionsCount, ReactionBody, EmojiIcon, Reactions, ExtraReaction as Reaction, ReactionApiParams };
