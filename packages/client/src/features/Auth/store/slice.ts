import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { defaultUserState } from 'features/User';
import API from 'utils/api';

import * as T from './types';

const initialState: T.State = {
  user: defaultUserState,
  isLoading: false,
  error: null,
  networkParticipants: {},
  eventParticipants: {},
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

const getNetworkParticipants = createAsyncThunk<Record<number, number>>(
  T.NETWORK_PARTICIPANTS_ACTION,
  async () =>
    (await API.user.networkParticipants<T.ParticipantsResponse>()).reduce(
      (acc, p) => ({ ...acc, [p.id]: +p.participants }),
      {},
    ),
);

const getEventParticipants = createAsyncThunk<Record<number, number>>(
  T.EVENT_PARTICIPANTS_ACTION,
  async () =>
    (await API.user.eventParticipants<T.ParticipantsResponse>()).reduce(
      (acc, p) => ({ ...acc, [p.id]: +p.participants }),
      {},
    ),
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
        const participants = state.networkParticipants;
        state.networkParticipants = {
          ...participants,
          [networkId]: (participants[networkId] || 0) + 1,
        };

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
        const participants = state.networkParticipants;
        state.networkParticipants = {
          ...participants,
          [networkId]: (participants[networkId] || 1) - 1,
        };

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
        const participants = state.eventParticipants;
        state.eventParticipants = {
          ...participants,
          [eventId]: (participants[eventId] || 0) + 1,
        };

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
        const participants = state.eventParticipants;
        state.eventParticipants = {
          ...participants,
          [eventId]: (participants[eventId] || 1) - 1,
        };
        stopLoading(state);
      })
      .addCase(leaveEvent.rejected, stopLoading)
      .addCase(getNetworkParticipants.pending, startLoading)
      .addCase(getNetworkParticipants.fulfilled, (state: T.State, action) => {
        const participants = action.payload;
        state.networkParticipants = participants;
        stopLoading(state);
      })
      .addCase(getEventParticipants.pending, startLoading)
      .addCase(getEventParticipants.fulfilled, (state: T.State, action) => {
        const participants = action.payload;
        state.eventParticipants = participants;
        stopLoading(state);
      });
  },
});

const { clear } = slice.actions;

export {
  clear,
  profile,
  joinNetwork,
  leaveNetwork,
  joinEvent,
  leaveEvent,
  getNetworkParticipants,
  getEventParticipants,
};

export default slice.reducer;
