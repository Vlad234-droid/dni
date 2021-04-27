import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import API from 'utils/api';
import { FilterPayload, PaginationPayload } from 'types/payload';
import { DEFAULT_META } from 'config/constants';
import { Loading } from 'store/types';

import Event, * as T from '../config/types';
import * as A from './actionTypes';

const eventsAdapter = createEntityAdapter<Event>();

const initialState: T.State = eventsAdapter.getInitialState({
  loading: Loading.IDLE,
  error: null,
  meta: DEFAULT_META,
  participants: {},
});

const getList = createAsyncThunk<
  T.ListResponse,
  FilterPayload & PaginationPayload
>(
  A.GET_LIST_ACTION,
  async (filters: FilterPayload & PaginationPayload) =>
    await API.events.fetchAll<T.ListResponse>(filters),
);

const getOne = createAsyncThunk<T.OneResponse, T.OnePayload>(
  A.GET_ONE_ACTION,
  async ({ id }: T.OnePayload) => await API.events.fetchOne<T.OneResponse>(id),
);

const createOne = createAsyncThunk<T.OneResponse, T.SetOnePayload>(
  A.SET_ONE_ACTION,
  async (data) => await API.events.create<T.OneResponse>(data),
);

const uploadImage = createAsyncThunk<
  Pick<T.OneResponse, 'id' | 'image'>,
  T.UploadImgPayload
>(A.UPLOAD_IMG_ACTION, async ({ id, image }) => {
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
});

const getCount = createAsyncThunk<number, FilterPayload>(
  A.GET_COUNT_ACTION,
  (data) => API.events.count<number>(data),
);

const getParticipants = createAsyncThunk<Record<number, number>>(
  A.GET_PARTICIPANTS_ACTION,
  async () =>
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
        [eventId]: (participants[eventId] || 0) + 1,
      };
    },
    leaveParticipant(state, { payload: eventId }) {
      const participants = state.participants;
      state.participants = {
        ...participants,
        [eventId]: (participants[eventId] || 1) - 1,
      };
    },
  },
  extraReducers: (builder) => {
    const setPending = (state: T.State) => {
      state.loading = Loading.PENDING;
    };

    const setSucceeded = (state: T.State) => {
      state.loading = Loading.SUCCEEDED;
    };

    // TODO: #set info about error received?
    const setFailed = (state: T.State) => {
      state.loading = Loading.FAILED;
    };

    builder
      .addCase(getCount.pending, setPending)
      // TODO: #action is not typed?
      .addCase(getCount.fulfilled, (state: T.State, { payload: total }) => {
        const meta = state.meta;
        state.meta = {
          ...meta,
          total,
        };
        setSucceeded(state);
      })
      // TODO: #rejected is not handled?
      .addCase(getList.pending, setPending)
      .addCase(getList.fulfilled, (state: T.State, { payload: events }) => {
        eventsAdapter.upsertMany(state, events);
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
      .addCase(uploadImage.pending, setPending)
      .addCase(uploadImage.fulfilled, (state: T.State, { payload }) => {
        eventsAdapter.updateOne(state, {
          ...payload,
          changes: { image: payload.image },
        });
        setSucceeded(state);
      })
      .addCase(uploadImage.rejected, setFailed)
      .addCase(getParticipants.pending, setPending)
      .addCase(getParticipants.fulfilled, (state: T.State, action) => {
        state.participants = action.payload;
        setSucceeded(state);
      })
      .addCase(getParticipants.rejected, setFailed);
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
