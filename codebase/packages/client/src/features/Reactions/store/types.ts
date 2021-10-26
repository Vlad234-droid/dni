import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';

import { Reaction, ReactionBody, Reactions } from '../config/types';

const ROOT = 'reactions';
const GET_REACTIONS_ACTION = `${ROOT}/getReactions`;
const ADD_REACTION = `${ROOT}/addReaction`;
const DELETE_REACTION = `${ROOT}/deleteReaction`;

const EntityAdapter = createEntityAdapter<Reaction>();

type State = {
  error?: string;
  reactions?: Reactions;
} & EntityState<Reaction>;

type ReactionsPayload = {
  uuid: string;
};

type ReactionsResponse = Reactions;
type AddReactionPayload = ReactionBody;
type AddReactionResponse = Reaction;
type DeleteReactionPayload = {
  uuid: string,
  reactionId: number,
  entityId: number,
};
type DeleteReactionResponse = {};

export type {
  State,
  ReactionsPayload,
  ReactionsResponse,
  AddReactionPayload,
  AddReactionResponse,
  DeleteReactionPayload,
  DeleteReactionResponse,
};

export {
  EntityAdapter,
  ROOT,
  GET_REACTIONS_ACTION,
  ADD_REACTION,
  DELETE_REACTION,
};