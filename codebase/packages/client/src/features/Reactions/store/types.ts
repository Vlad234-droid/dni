import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';

import Loading from 'types/loading';
import { EntityType } from 'types/entity';

import { Reaction, Variant } from '../config/types';

const EMOJIS_ACTION = 'emojis/list';
const ROOT = 'auth';
const LIST_ACTION = `${ROOT}/reactions`;
const CHANGE_ACTION = `${ROOT}/changeReactions`;

const EntityAdapter = createEntityAdapter<Reactions>();

type EntityId = number;
type Reactions = {
  reactions: Variant[];
  reactionsCount: Record<Variant, number>;
};

type OneResponse = {
  id: EntityId;
  entityType: EntityType;
} & Reactions;

type Emoji = {
  type: Variant;
  icon: {
    active: string;
    default: string;
  };
};

type EmojiResponse = Emoji[];

type ListResponse = OneResponse[];

type State = {
  loading: Loading;
  error?: string;
  emojis: Emoji[];
} & EntityState<Reactions>;

type OnePayload = {
  id: EntityId;
  entityType: EntityType;
  reactions: Variant[];
};

export { EntityAdapter, EMOJIS_ACTION, ROOT, LIST_ACTION, CHANGE_ACTION };
export type { State, OnePayload, OneResponse, ListResponse, Reaction, EmojiResponse };
