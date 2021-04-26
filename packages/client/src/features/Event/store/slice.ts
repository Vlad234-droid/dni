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

import {
  GET_COUNT_ACTION,
  GET_LIST_ACTION,
  GET_ONE_ACTION,
  ROOT,
  SET_ONE_ACTION,
  UPLOAD_IMG_ACTION,
} from './actionTypes';

const eventsAdapter = createEntityAdapter<Event>();

const initialState: T.State = eventsAdapter.getInitialState({
  loading: Loading.IDLE,
  error: null,
  meta: DEFAULT_META,
});

const getList = createAsyncThunk<
  T.ListResponse,
  FilterPayload & PaginationPayload
>(
  GET_LIST_ACTION,
  async (filters: FilterPayload & PaginationPayload) =>
    await API.events.fetchAll<T.ListResponse>(filters),
);

const getOne = createAsyncThunk<T.OneResponse, T.OnePayload>(
  GET_ONE_ACTION,
  async ({ id }: T.OnePayload) => await API.events.fetchOne<T.OneResponse>(id),
);

const createOne = createAsyncThunk<T.OneResponse, T.SetOnePayload>(
  SET_ONE_ACTION,
  async (data) => await API.events.create<T.OneResponse>(data),
);

const uploadImage = createAsyncThunk<
  Pick<T.OneResponse, 'id' | 'image'>,
  T.UploadImgPayload
>(UPLOAD_IMG_ACTION, async ({ id, image }) => {
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
  GET_COUNT_ACTION,
  (data) => API.events.count<number>(data),
);

const slice = createSlice({
  name: ROOT,
  initialState,
  reducers: {
    clear(state) {
      eventsAdapter.removeAll(state);
      state.meta = initialState.meta;
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
      .addCase(uploadImage.rejected, setFailed);
  },
});

const { clear } = slice.actions;

export {
  eventsAdapter,
  getList,
  getOne,
  createOne,
  uploadImage,
  getCount,
  clear,
};

export default slice.reducer;
