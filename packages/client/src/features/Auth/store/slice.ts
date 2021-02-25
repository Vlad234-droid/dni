import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { defaultUserState } from 'features/User';
import { getDataOrReject } from 'utils/storeHelper';

import * as T from './types';

const initialState: T.State = {
  user: defaultUserState,
  token: null,
  isLoading: false,
  error: null,
};

const login = createAsyncThunk<
  T.UserResponse,
  T.LoginPayload,
  {
    rejectValue: T.ValidationError;
  }
>(T.LOGIN_ACTION, async (payload: T.LoginPayload, { rejectWithValue }) => {
  return await getDataOrReject<
    T.UserResponse,
    T.ValidationError,
    ReturnType<typeof rejectWithValue>
  >(async () => {
    // return await API.Auth.signIn<T.UserResponse>(payload);

    return {
      user: { firstName: 'Test', lastName: 'Test', id: 1, role: 'admin' },
      token: '1111',
    } as T.UserResponse;
  }, rejectWithValue);
});

const logout = createAsyncThunk<T.UserResponse>(T.LOGOUT_ACTION, async () => {
  // await API.Auth.signOut();

  return { user: defaultUserState, token: null } as T.UserResponse;
});

const slice = createSlice({
  name: T.ROOT,
  initialState,
  reducers: {
    clear(state) {
      state.token = null;
      state.user = defaultUserState;
    },
  },
  extraReducers: (builder) => {
    const startLoading = (state: T.State) => {
      state.isLoading = true;
    };
    const handleRejection = (
      state: T.State,
      { payload: { message } = {} }: { payload?: { message?: string } },
    ) => {
      if (message) {
        state.error = message;
      }
      state.isLoading = false;
    };
    const handleAuthentication = (
      state: T.State,
      { payload: { user, token } }: { payload: T.UserResponse },
    ) => {
      state.token = token;
      state.user = user;
      state.isLoading = false;
    };
    const handleLogout = (state: T.State) => {
      state.token = null;
      state.user = defaultUserState;
      state.isLoading = false;
    };

    builder
      .addCase(login.pending, startLoading)
      .addCase(login.fulfilled, handleAuthentication)
      .addCase(login.rejected, handleRejection)
      .addCase(logout.fulfilled, handleLogout);
  },
});

const { clear } = slice.actions;

export { clear, logout, login };

export default slice.reducer;
