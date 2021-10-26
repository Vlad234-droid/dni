import { User, DefaultUser } from 'features/User';
import Loading from 'types/loading';
// import { Reactions, Reaction, ReactionBody, ReactionType } from 'features/Reactions';

const ROOT = 'auth';
const FETCH_PROFILE_ACTION = `${ROOT}/profile`;
const JOIN_NETWORK_ACTION = `${ROOT}/joinNetwork`;
const LEAVE_NETWORK_ACTION = `${ROOT}/leaveNetwork`;
const JOIN_EVENT_ACTION = `${ROOT}/joinEvent`;
const LEAVE_EVENT_ACTION = `${ROOT}/leaveEvent`;
// const GET_REACTIONS_ACTION = `${ROOT}/getReactions`;
// const ADD_REACTION = `${ROOT}/addReaction`;
// const DELETE_REACTION = `${ROOT}/deleteReaction`;

type State = {
  user: DefaultUser | User;
  loading: Loading;
  error?: string;
  networkLoading: Loading;
  networkError?: string;
  eventLoading: Loading;
  eventError?: string;
  // reactions?: Reactions;
};

type UserResponse = DefaultUser | User;

type NetworkPayload = {
  networkId: number;
};

type NetworkResponse = {
  message: string;
  body: NetworkPayload;
};

type EventPayload = {
  eventId: number;
};

type EventResponse = {
  message: string;
  body: EventPayload;
};

type ValidationError = {
  message: string;
  path: string[];
};

// type ReactionsPayload = {
//   uuid: string;
// };
//
// type ReactionsResponse = Reactions;
// type AddReactionPayload = ReactionBody;
// type AddReactionResponse = Reaction;
// type DeleteReactionPayload = {
//   uuid: string,
//   reactionId: number,
//   reactionType: ReactionType,
// };
// type DeleteReactionResponse = {};

export type {
  State,
  UserResponse,
  ValidationError,
  NetworkPayload,
  NetworkResponse,
  EventPayload,
  EventResponse,
  // ReactionsPayload,
  // ReactionsResponse,
  // AddReactionPayload,
  // AddReactionResponse,
  // DeleteReactionPayload,
  // DeleteReactionResponse,
};

export {
  // actions
  ROOT,
  FETCH_PROFILE_ACTION,
  JOIN_NETWORK_ACTION,
  LEAVE_NETWORK_ACTION,
  JOIN_EVENT_ACTION,
  LEAVE_EVENT_ACTION,
  // GET_REACTIONS_ACTION,
  // ADD_REACTION,
  // DELETE_REACTION,
};
