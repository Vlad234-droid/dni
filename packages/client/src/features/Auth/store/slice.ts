import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { defaultUserState } from 'features/User';
import API from 'utils/api';
import Loading from 'types/loading';

import * as T from './types';

const initialState: T.State = {
  user: defaultUserState,
  loading: Loading.IDLE,
  error: undefined,
};

const profile = createAsyncThunk<T.UserResponse>(
  T.FETCH_PROFILE_ACTION,
  async () => await API.user.profile<T.UserResponse>(),
);

const joinNetwork = createAsyncThunk<T.NetworkResponse, T.NetworkPayload>(
  T.JOIN_NETWORK_ACTION,
  async (data) => await API.user.joinNetwork<T.NetworkResponse>(data),
);

const leaveNetwork = createAsyncThunk<T.NetworkResponse, T.NetworkPayload>(
  T.LEAVE_NETWORK_ACTION,
  async (data) => await API.user.leaveNetwork<T.NetworkResponse>(data),
);

const joinEvent = createAsyncThunk<T.EventResponse, T.EventPayload>(
  T.JOIN_EVENT_ACTION,
  async (data) => await API.user.joinEvent<T.EventResponse>(data),
);

const leaveEvent = createAsyncThunk<T.EventResponse, T.EventPayload>(
  T.LEAVE_EVENT_ACTION,
  async (data) => await API.user.leaveEvent<T.EventResponse>(data),
);

const slice = createSlice({
  name: T.ROOT,
  initialState,
  reducers: {
    clear(state) {
      state.user = defaultUserState;
    },
  },
  extraReducers: (builder) => {
    const setPending = (state: T.State) => {
      state.loading = Loading.PENDING;
      state.error = undefined;
    };

    const setSucceeded = (state: T.State) => {
      state.loading = Loading.SUCCEEDED;
    };

    const setFailed = (state: T.State, payload: any) => {
      state.loading = Loading.FAILED;
      state.error = payload.error.message;
    };

    const handleAuthentication = (
      state: T.State,
      { payload: user }: { payload: T.UserResponse },
    ) => {
      state.user = user;
      setSucceeded(state);
    };

    builder
      .addCase(profile.pending, setPending)
      .addCase(profile.fulfilled, handleAuthentication)
      .addCase(profile.rejected, setFailed)
      .addCase(joinNetwork.pending, setPending)
      .addCase(joinNetwork.fulfilled, (state: T.State, action) => {
        const networkId = +action.payload.body.networkId;
        const networks = state.user.networks;

        if (networks && networks.indexOf(networkId) === -1) {
          networks.push(networkId);
          state.user.networks = networks;
        }
        setSucceeded(state);
      })
      .addCase(joinNetwork.rejected, setFailed)
      .addCase(leaveNetwork.pending, setPending)
      .addCase(leaveNetwork.fulfilled, (state: T.State, action) => {
        const networkId = +action.payload.body.networkId;
        const networks = state.user.networks;

        if (networks && networks.indexOf(networkId) > -1) {
          networks.splice(networks.indexOf(networkId), 1);
          state.user.networks = networks;
        }
        setSucceeded(state);
      })
      .addCase(leaveNetwork.rejected, setFailed)
      .addCase(joinEvent.pending, setPending)
      .addCase(joinEvent.fulfilled, (state: T.State, action) => {
        const eventId = +action.payload.body.eventId;
        const events = state.user.events;

        if (events && events.indexOf(eventId) === -1) {
          events.push(eventId);
          state.user.events = events;
        }
        setSucceeded(state);
      })
      .addCase(joinEvent.rejected, setFailed)
      .addCase(leaveEvent.pending, setPending)
      .addCase(leaveEvent.fulfilled, (state: T.State, action) => {
        const eventId = +action.payload.body.eventId;
        const events = state.user.events;

        if (events && events.indexOf(eventId) > -1) {
          events.splice(events.indexOf(eventId), 1);
          state.user.events = events;
        }
        setSucceeded(state);
      })
      .addCase(leaveEvent.rejected, setFailed);
  },
});

const { clear } = slice.actions;

export { clear, profile, joinNetwork, leaveNetwork, joinEvent, leaveEvent };

export default slice.reducer;
