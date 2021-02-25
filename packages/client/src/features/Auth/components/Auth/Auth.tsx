import React, { FC, useCallback, useMemo } from 'react';

import useStore from 'hooks/useStore';
import useDispatch from 'hooks/useDispatch';

import { LoginAction, LogoutAction } from '../../config/types';
import { login, logout, State as AuthState } from '../../store';
import { AuthProvider } from '../../context/authContext';

const Auth: FC = ({ children }) => {
  const { user, token } = useStore<AuthState>((r) => r.auth);
  const dispatch = useDispatch();

  const isAuthenticated = useMemo(() => Boolean(user?.id), [user]);

  const loginAction: LoginAction = useCallback(
    (payload) => dispatch(login(payload)),
    [],
  );

  const logoutAction: LogoutAction = useCallback(() => dispatch(logout()), []);

  return (
    <AuthProvider
      value={{
        authenticated: isAuthenticated,
        user: user,
        accessToken: token,
        login: loginAction,
        logout: logoutAction,
      }}
    >
      {children}
    </AuthProvider>
  );
};

export default Auth;
