import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import API from 'utils/api';
import { FilterPayload, PaginationPayload } from 'types/payload';
import { DEFAULT_META, DEFAULT_PARTICIPANTS } from 'config/constants';
import Loading from 'types/loading';

import Event, * as T from '../config/types';
import * as A from './actionTypes';

const eventsAdapter = createEntityAdapter<Event>();

const initialState: T.State = eventsAdapter.getInitialState({
  data: {},
  loading: Loading.IDLE,
  error: undefined,
  meta: DEFAULT_META,
  participants: DEFAULT_PARTICIPANTS,
});

const getList = createAsyncThunk<T.ListResponse, FilterPayload & PaginationPayload>(
  A.GET_LIST_ACTION,
  async (filters: FilterPayload & PaginationPayload) => await API.events.fetchAll<T.ListResponse>(filters),
);

const getOne = createAsyncThunk<T.OneResponse, T.OnePayload>(
  A.GET_ONE_ACTION,
  async ({ id }: T.OnePayload) => await API.events.fetchOne<T.OneResponse>(id),
);

const createOne = createAsyncThunk<T.OneResponse, T.SetOnePayload>(
  A.SET_ONE_ACTION,
  async (data) => await API.events.create<T.OneResponse>(data),
);

const uploadImage = createAsyncThunk<Pick<T.OneResponse, 'id' | 'image'>, T.UploadImgPayload>(
  A.UPLOAD_IMG_ACTION,
  async ({ id, image }) => {
    const data = new FormData();
    data.append('refId', String(id));
    data.append('ref', 'Event');
    data.append('field', 'image');
    data.append('files', image);

    const uploadedImage = await API.common.upload<T.OneImageResponse>(data);

    return {
      id,
      image: uploadedImage,
    };
  },
);

const getCount = createAsyncThunk<number, FilterPayload>(A.GET_COUNT_ACTION, (data) => API.events.count<number>(data));

const getParticipants = createAsyncThunk<Record<number, number>>(A.GET_PARTICIPANTS_ACTION, async () =>
  (await API.events.participants<T.ParticipantsResponse>()).reduce(
    (acc, p) => ({ ...acc, [p.id]: +p.participants }),
    {},
  ),
);

const slice = createSlice({
  name: A.ROOT,
  initialState,
  reducers: {
    clear(state) {
      eventsAdapter.removeAll(state);
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setFailed = (state: T.State, payload: any) => {
      state.loading = Loading.FAILED;
      state.error = payload.error.message;
    };

    builder
      .addCase(getCount.pending, (state: T.State) => {
        state.meta.loading = Loading.PENDING;
        state.meta.error = undefined;
      })
      .addCase(getCount.fulfilled, (state: T.State, { payload: total }) => {
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
      .addCase(getList.fulfilled, (state: T.State, { payload: events }) => {
        eventsAdapter.upsertMany(state, events);
        const meta = state.meta;
        state.meta = {
          ...meta,
        };
        setSucceeded(state);
      })
      .addCase(getList.rejected, setFailed)
      .addCase(getOne.pending, setPending)
      .addCase(getOne.fulfilled, (state: T.State, { payload: event }) => {
        eventsAdapter.upsertOne(state, event);
        setSucceeded(state);
      })
      .addCase(getOne.rejected, setFailed)
      .addCase(createOne.pending, setPending)
      .addCase(createOne.fulfilled, (state: T.State, { payload: event }) => {
        eventsAdapter.upsertOne(state, event);
        setSucceeded(state);
      })
      .addCase(createOne.rejected, setFailed)
      .addCase(uploadImage.pending, setPending)
      .addCase(uploadImage.fulfilled, (state: T.State, { payload }) => {
        eventsAdapter.updateOne(state, {
          ...payload,
          changes: { image: payload.image },
        });
        setSucceeded(state);
      })
      .addCase(uploadImage.rejected, setFailed)
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
  eventsAdapter,
  getList,
  getOne,
  createOne,
  uploadImage,
  getCount,
  clear,
  getParticipants,
  joinParticipant,
  leaveParticipant,
};

export default slice.reducer;
