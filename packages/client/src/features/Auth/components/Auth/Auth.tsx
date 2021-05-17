import React, { FC, useEffect, useCallback, useMemo } from 'react';

import useStore from 'hooks/useStore';
import useDispatch from 'hooks/useDispatch';

import { FetchUserAction } from '../../config/types';
import { profile, State as AuthState } from '../../store';
import { AuthProvider } from '../../context/authContext';

const Auth: FC = ({ children }) => {
  const { user } = useStore<AuthState>((r) => r.auth);
  const dispatch = useDispatch();

  const isAuthenticated = useMemo(() => Boolean(user?.id), [user]);

  const fetchUserAction: FetchUserAction = useCallback(
    () => dispatch(profile()),
    [],
  );

  useEffect(() => {
    fetchUserAction();
  }, [fetchUserAction]);

  // TODO: remove in future
  if (user.role === 'guest') return null;

  return (
    <AuthProvider
      value={{
        authenticated: isAuthenticated,
        user: user,
        fetchUser: fetchUserAction,
      }}
    >
      {children}
    </AuthProvider>
  );
};

export default Auth;
