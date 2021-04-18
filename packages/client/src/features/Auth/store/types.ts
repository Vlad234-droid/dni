import { User, DefaultUser } from 'features/User';

const ROOT = 'auth';
const FETCH_PROFILE_ACTION = `${ROOT}/profile`;
const JOIN_NETWORK_ACTION = `${ROOT}/joinNetwork`;
const LEAVE_NETWORK_ACTION = `${ROOT}/leaveNetwork`;
const TAKE_PART_EVENT_ACTION = `${ROOT}/takePartEvent`;
const MISS_OUT_EVENT_ACTION = `${ROOT}/missOutEvent`;

type State = {
  user: DefaultUser | User;
  isLoading: boolean;
  error: Nullable<string>;
};

type UserResponse = DefaultUser | User;

type NetworkPayload = {
  employeeNumber: string;
  networkId: number;
};

type NetworkResponse = {
  message: string;
  body: NetworkPayload;
};

type EventPayload = {
  employeeNumber: string;
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
  TAKE_PART_EVENT_ACTION,
  MISS_OUT_EVENT_ACTION,
};
