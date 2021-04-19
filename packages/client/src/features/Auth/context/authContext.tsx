import { createContext } from 'react';

import { defaultUserState, DefaultUser, User } from 'features/User';

import { FetchUserAction } from '../config/types';

type AuthData = {
  authenticated: boolean;
  user: DefaultUser | User;
  fethUser: FetchUserAction;
};

export const defaultValue: AuthData = {
  authenticated: false, // to check if authenticated or not
  user: defaultUserState, // store all the user details
  fethUser: () => null, // to start fetch user
};

const authContext = createContext<AuthData>(defaultValue);

export const AuthProvider = authContext.Provider;
export const AuthConsumer = authContext.Consumer;

export default authContext;
