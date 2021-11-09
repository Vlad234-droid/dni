import React, { FC, useEffect, useCallback, useMemo } from 'react';

import useStore from 'hooks/useStore';
import useDispatch from 'hooks/useDispatch';
import { Spinner, Error } from 'features/Common';
import { getReactions } from 'features/Reactions';
import Loading from 'types/loading';

import { FetchUserAction } from '../../config/types';
import { profile, State as AuthState } from '../../store';
import { AuthProvider } from '../../context/authContext';

const Auth: FC = ({ children }) => {
  const { user, loading, error, networkError, eventError } = useStore<AuthState>((r) => r.auth);
  const dispatch = useDispatch();
  const isLoading = useMemo(() => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED, [loading]);
  const isAuthenticated = useMemo(() => Boolean(user?.id), [user]);
  const uuid = user!.colleagueUUID;

  const fetchUserAction: FetchUserAction = useCallback(() => dispatch(profile()), []);

  // useEffect(() => {
  //   if (uuid) {
  //     dispatch(getReactions({ uuid }));
  //   }
  // }, [uuid]);

  useEffect(() => {
    fetchUserAction();
  }, [fetchUserAction]);

  if (error || networkError || eventError) return <Error errorData={{ title: error }} />;
  if (isLoading) return <Spinner height='100vh' />;

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
