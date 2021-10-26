import { User, DefaultUser } from 'features/User';
import Loading from 'types/loading';

const ROOT = 'auth';
const FETCH_PROFILE_ACTION = `${ROOT}/profile`;
const JOIN_NETWORK_ACTION = `${ROOT}/joinNetwork`;
const LEAVE_NETWORK_ACTION = `${ROOT}/leaveNetwork`;
const JOIN_EVENT_ACTION = `${ROOT}/joinEvent`;
const LEAVE_EVENT_ACTION = `${ROOT}/leaveEvent`;

type State = {
  user: DefaultUser | User;
  loading: Loading;
  error?: string;
  networkLoading: Loading;
  networkError?: string;
  eventLoading: Loading;
  eventError?: string;
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

export type {
  State,
  UserResponse,
  ValidationError,
  NetworkPayload,
  NetworkResponse,
  EventPayload,
  EventResponse,
};

export {
  // actions
  ROOT,
  FETCH_PROFILE_ACTION,
  JOIN_NETWORK_ACTION,
  LEAVE_NETWORK_ACTION,
  JOIN_EVENT_ACTION,
  LEAVE_EVENT_ACTION,
};
