import { createContext } from 'react';

import { defaultUserState, DefaultUser, User } from 'features/User';

import { LoginAction, LogoutAction } from '../config/types';

type AuthData = {
  authenticated: boolean;
  user: DefaultUser | User;
  accessToken: Nullable<string>;
  login: LoginAction;
  logout: LogoutAction;
};

export const defaultValue: AuthData = {
  authenticated: false, // to check if authenticated or not
  user: defaultUserState, // store all the user details
  accessToken: null,
  login: () => null, // to start the login process
  logout: () => null, // logout the user
};

const authContext = createContext<AuthData>(defaultValue);

export const AuthProvider = authContext.Provider;
export const AuthConsumer = authContext.Consumer;

export default authContext;
