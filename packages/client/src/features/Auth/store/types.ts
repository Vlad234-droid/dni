import { User, DefaultUser } from 'features/User';

const ROOT = 'auth';
const FETCH_PROFILE_ACTION = `${ROOT}/profile`;
const JOIN_NETWORK_ACTION = `${ROOT}/joinNetwork`;
const LEAVE_NETWORK_ACTION = `${ROOT}/leaveNetwork`;
const JOIN_EVENT_ACTION = `${ROOT}/joinEvent`;
const LEAVE_EVENT_ACTION = `${ROOT}/leaveEvent`;
const EVENT_PARTICIPANTS_ACTION = `${ROOT}/eventParticipants`;
const NETWORK_PARTICIPANTS_ACTION = `${ROOT}/networkParticipants`;

type State = {
  user: DefaultUser | User;
  isLoading: boolean;
  error: Nullable<string>;
  participants: {
    networks: Record<number, number>;
    events: Record<number, number>;
  };
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

type Participant = {
  id: number;
  participants: number;
};

type ParticipantsResponse = Participant[];

export type {
  State,
  UserResponse,
  ValidationError,
  NetworkPayload,
  NetworkResponse,
  EventPayload,
  EventResponse,
  ParticipantsResponse,
};

export {
  // actions
  ROOT,
  FETCH_PROFILE_ACTION,
  JOIN_NETWORK_ACTION,
  LEAVE_NETWORK_ACTION,
  JOIN_EVENT_ACTION,
  LEAVE_EVENT_ACTION,
  EVENT_PARTICIPANTS_ACTION,
  NETWORK_PARTICIPANTS_ACTION,
};
