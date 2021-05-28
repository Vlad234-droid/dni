import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import API from 'utils/api';
import { FilterPayload, PaginationPayload } from 'types/payload';
import { DEFAULT_META, DEFAULT_PARTICIPANTS } from 'config/constants';
import Loading from 'types/loading';

import Network, * as T from '../config/types';
import * as A from './actionTypes';

const networksAdapter = createEntityAdapter<Network>();

const initialState: T.State = networksAdapter.getInitialState({
  loading: Loading.IDLE,
  error: undefined,
  meta: DEFAULT_META,
  participants: DEFAULT_PARTICIPANTS,
});

const getList = createAsyncThunk<
  T.ListResponse,
  FilterPayload & PaginationPayload
>(
  A.GET_LIST_ACTION,
  async (filters) => await API.networks.fetchAll<T.ListResponse>(filters),
);

const getOne = createAsyncThunk<T.OneResponse, T.OnePayload>(
  A.GET_ONE_ACTION,
  async ({ id }: T.OnePayload) =>
    await API.networks.fetchOne<T.OneResponse>(id),
);

const createOne = createAsyncThunk<T.OneResponse, T.SetOnePayload>(
  A.SET_ONE_ACTION,
  async (data) => await API.networks.create<T.OneResponse>(data),
);

const getCount = createAsyncThunk<number, FilterPayload>(
  A.GET_COUNT_ACTION,
  (data) => API.networks.count<number>(data),
);

const getParticipants = createAsyncThunk<Record<number, number>>(
  A.GET_PARTICIPANTS_ACTION,
  async () =>
    (await API.networks.participants<T.ParticipantsResponse>()).reduce(
      (acc, p) => ({ ...acc, [p.id]: +p.participants }),
      {},
    ),
);

const slice = createSlice({
  name: A.ROOT,
  initialState,
  reducers: {
    clear(state) {
      networksAdapter.removeAll(state);
      state.meta = initialState.meta;
    },
    joinParticipant(state, { payload: eventId }) {
      const participants = state.participants;
      state.participants = {
        ...participants,
        data: {
          ...participants.data,
          [eventId]: (participants.data[eventId] || 0) + 1,
        },
      };
    },
    leaveParticipant(state, { payload: eventId }) {
      const participants = state.participants;
      state.participants = {
        ...participants,
        data: {
          ...participants.data,
          [eventId]: (participants.data[eventId] || 1) - 1,
        },
      };
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

    builder
      .addCase(getCount.pending, (state: T.State) => {
        state.meta.loading = Loading.PENDING;
        state.meta.error = undefined;
      })
      .addCase(getCount.fulfilled, (state: T.State, action) => {
        const total = action.payload;
        const meta = state.meta;
        state.meta = {
          ...meta,
          total,
          loading: Loading.SUCCEEDED,
        };
      })
      .addCase(getCount.rejected, (state: T.State, payload) => {
        state.meta.loading = Loading.FAILED;
        state.meta.error = payload.error.message;
      })
      .addCase(getList.pending, setPending)
      .addCase(getList.fulfilled, (state: T.State, action) => {
        const data = action.payload;
        networksAdapter.upsertMany(state, data);
        const meta = state.meta;
        state.meta = {
          ...meta,
        };

        setSucceeded(state);
      })
      .addCase(getList.rejected, setFailed)
      .addCase(getOne.pending, setPending)
      .addCase(getOne.fulfilled, (state: T.State, action) => {
        networksAdapter.upsertOne(state, action.payload);
        setSucceeded(state);
      })
      .addCase(getOne.rejected, setFailed)
      .addCase(createOne.pending, setPending)
      .addCase(createOne.fulfilled, (state: T.State, action) => {
        networksAdapter.upsertOne(state, action.payload);
        setSucceeded(state);
      })
      .addCase(createOne.rejected, setFailed)
      .addCase(getParticipants.pending, (state: T.State) => {
        state.participants.loading = Loading.PENDING;
        state.participants.error = undefined;
      })
      .addCase(getParticipants.fulfilled, (state: T.State, action) => {
        state.participants.data = action.payload;
        state.participants.loading = Loading.SUCCEEDED;
      })
      .addCase(getParticipants.rejected, (state: T.State, payload) => {
        state.participants.loading = Loading.FAILED;
        state.participants.error = payload.error.message;
      })
      .addDefaultCase((state) => state);
  },
});

const { clear, joinParticipant, leaveParticipant } = slice.actions;

export {
  networksAdapter,
  getList,
  getOne,
  createOne,
  getCount,
  clear,
  getParticipants,
  joinParticipant,
  leaveParticipant,
};

export default slice.reducer;
