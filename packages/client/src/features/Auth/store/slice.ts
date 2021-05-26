import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { defaultUserState } from 'features/User';
import API from 'utils/api';
import Loading from 'types/loading';

import * as T from './types';

const initialState: T.State = {
  user: defaultUserState,
  loading: Loading.IDLE,
  error: undefined,
  networkLoading: Loading.IDLE,
  networkError: undefined,
  eventLoading: Loading.IDLE,
  eventError: undefined,
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
      console.log('payload', payload);
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
      .addCase(joinNetwork.pending, (state: T.State) => {
        state.networkLoading = Loading.PENDING;
        state.networkError = undefined;
      })
      .addCase(joinNetwork.fulfilled, (state: T.State, action) => {
        const networkId = +action.payload.body.networkId;
        const networks = state.user.networks;

        if (networks && networks.indexOf(networkId) === -1) {
          networks.push(networkId);
          state.user.networks = networks;
        }
        state.networkLoading = Loading.SUCCEEDED;
      })
      .addCase(joinNetwork.rejected, (state: T.State, payload) => {
        state.networkLoading = Loading.FAILED;
        state.networkError = payload.error.message;
      })
      .addCase(leaveNetwork.pending, (state: T.State) => {
        state.networkLoading = Loading.PENDING;
        state.networkError = undefined;
      })
      .addCase(leaveNetwork.fulfilled, (state: T.State, action) => {
        const networkId = +action.payload.body.networkId;
        const networks = state.user.networks;

        if (networks && networks.indexOf(networkId) > -1) {
          networks.splice(networks.indexOf(networkId), 1);
          state.user.networks = networks;
        }
        state.networkLoading = Loading.SUCCEEDED;
      })
      .addCase(leaveNetwork.rejected, (state: T.State, payload) => {
        state.networkLoading = Loading.FAILED;
        state.networkError = payload.error.message;
      })
      .addCase(joinEvent.pending, (state: T.State) => {
        state.eventLoading = Loading.PENDING;
        state.eventError = undefined;
      })
      .addCase(joinEvent.fulfilled, (state: T.State, action) => {
        const eventId = +action.payload.body.eventId;
        const events = state.user.events;

        if (events && events.indexOf(eventId) === -1) {
          events.push(eventId);
          state.user.events = events;
        }
        state.eventLoading = Loading.SUCCEEDED;
      })
      .addCase(joinEvent.rejected, (state: T.State, payload) => {
        state.eventLoading = Loading.FAILED;
        state.eventError = payload.error.message;
      })
      .addCase(leaveEvent.pending, (state: T.State) => {
        state.eventLoading = Loading.PENDING;
        state.eventError = undefined;
      })
      .addCase(leaveEvent.fulfilled, (state: T.State, action) => {
        const eventId = +action.payload.body.eventId;
        const events = state.user.events;

        if (events && events.indexOf(eventId) > -1) {
          events.splice(events.indexOf(eventId), 1);
          state.user.events = events;
        }
        state.eventLoading = Loading.SUCCEEDED;
      })
      .addCase(leaveEvent.rejected, (state: T.State, payload) => {
        state.eventLoading = Loading.FAILED;
        state.eventError = payload.error.message;
      });
  },
});

const { clear } = slice.actions;

export { clear, profile, joinNetwork, leaveNetwork, joinEvent, leaveEvent };

export default slice.reducer;
