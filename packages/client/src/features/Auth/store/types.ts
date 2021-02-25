import { User, DefaultUser } from 'features/User';

const ROOT = 'auth';
const LOGIN_ACTION = `${ROOT}/login`;
const LOGOUT_ACTION = `${ROOT}/logout`;

export type State = {
  user: DefaultUser | User;
  token: Nullable<string>;
  isLoading: boolean;
  error: Nullable<string>;
};

export type UserResponse = {
  user: DefaultUser | User;
  token: Nullable<string>;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ValidationError = {
  message: string;
  path: string[];
};

export {
  // actions
  ROOT,
  LOGIN_ACTION,
  LOGOUT_ACTION,
};
