import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { defaultUserState } from 'features/User';
import API from 'utils/api';

import * as T from './types';

const initialState: T.State = {
  user: defaultUserState,
  isLoading: false,
  error: null,
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
    const startLoading = (state: T.State) => {
      state.isLoading = true;
    };
    const stopLoading = (state: T.State) => {
      state.isLoading = false;
    };
    const handleAuthentication = (
      state: T.State,
      { payload: user }: { payload: T.UserResponse },
    ) => {
      state.user = user;
      stopLoading(state);
    };

    builder
      .addCase(profile.pending, startLoading)
      .addCase(profile.fulfilled, handleAuthentication)
      .addCase(profile.rejected, stopLoading)
      .addCase(joinNetwork.pending, startLoading)
      .addCase(joinNetwork.fulfilled, (state: T.State, action) => {
        const networkId = +action.payload.body.networkId;
        const networks = state.user.networks;

        if (networks && networks.indexOf(networkId) === -1) {
          networks.push(networkId);
          state.user.networks = networks;
        }
        stopLoading(state);
      })
      .addCase(joinNetwork.rejected, stopLoading)
      .addCase(leaveNetwork.pending, startLoading)
      .addCase(leaveNetwork.fulfilled, (state: T.State, action) => {
        const networkId = +action.payload.body.networkId;
        const networks = state.user.networks;

        if (networks && networks.indexOf(networkId) > -1) {
          networks.splice(networks.indexOf(networkId), 1);
          state.user.networks = networks;
        }
        stopLoading(state);
      })
      .addCase(leaveNetwork.rejected, stopLoading)
      .addCase(joinEvent.pending, startLoading)
      .addCase(joinEvent.fulfilled, (state: T.State, action) => {
        const eventId = +action.payload.body.eventId;
        const events = state.user.events;

        if (events && events.indexOf(eventId) === -1) {
          events.push(eventId);
          state.user.events = events;
        }
        stopLoading(state);
      })
      .addCase(joinEvent.rejected, stopLoading)
      .addCase(leaveEvent.pending, startLoading)
      .addCase(leaveEvent.fulfilled, (state: T.State, action) => {
        const eventId = +action.payload.body.eventId;
        const events = state.user.events;

        if (events && events.indexOf(eventId) > -1) {
          events.splice(events.indexOf(eventId), 1);
          state.user.events = events;
        }
        stopLoading(state);
      })
      .addCase(leaveEvent.rejected, stopLoading);
  },
});

const { clear } = slice.actions;

export { clear, profile, joinNetwork, leaveNetwork, joinEvent, leaveEvent };

export default slice.reducer;
