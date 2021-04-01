import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import API from 'utils/api';
import {
  DEFAULT_META,
  FilterPayload,
  PaginationPayload,
} from 'utils/storeHelper';

import * as T from './types';

const initialState: T.State = T.EntityAdapter.getInitialState({
  isLoading: false,
  error: null,
  meta: DEFAULT_META,
});

const getList = createAsyncThunk<
  T.ListResponse,
  FilterPayload & PaginationPayload
>(
  T.LIST_ACTION,
  async (filters) => await API.networks.fetchAll<T.ListResponse>(filters),
);

const getOne = createAsyncThunk<T.OneResponse, T.OnePayload>(
  T.ONE_ACTION,
  async ({ id }: T.OnePayload) =>
    await API.networks.fetchOne<T.OneResponse>(id),
);

const createOne = createAsyncThunk<T.OneResponse, T.SetOnePayload>(
  T.SET_ONE_ACTION,
  async (data) => await API.networks.create<T.OneResponse>(data),
);

const getCount = createAsyncThunk<number, FilterPayload>(
  T.COUNT_ACTION,
  (data) => API.networks.count<number>(data),
);

const slice = createSlice({
  name: T.ROOT,
  initialState,
  reducers: {
    clear(state) {
      T.EntityAdapter.removeAll(state);
      state.meta = initialState.meta;
    },
  },
  extraReducers: (builder) => {
    const startLoading = (state: T.State) => {
      state.isLoading = true;
    };
    const stopLoading = (state: T.State) => {
      state.isLoading = false;
    };

    builder
      .addCase(getCount.pending, startLoading)
      .addCase(getCount.fulfilled, (state: T.State, action) => {
        const total = action.payload;
        const meta = state.meta;
        state.meta = {
          ...meta,
          total,
        };
        stopLoading(state);
      })
      .addCase(getList.pending, startLoading)
      .addCase(getList.fulfilled, (state: T.State, action) => {
        const data = action.payload;
        T.EntityAdapter.upsertMany(state, data);
        const meta = state.meta;
        state.meta = {
          ...meta,
        };
        stopLoading(state);
      })
      .addCase(getList.rejected, stopLoading)
      .addCase(getOne.pending, startLoading)
      .addCase(getOne.fulfilled, (state: T.State, action) => {
        T.EntityAdapter.upsertOne(state, action.payload);
        stopLoading(state);
      })
      .addCase(getOne.rejected, stopLoading)
      .addCase(createOne.pending, startLoading)
      .addCase(createOne.fulfilled, (state: T.State, action) => {
        T.EntityAdapter.upsertOne(state, action.payload);
        stopLoading(state);
      })
      .addCase(createOne.rejected, stopLoading);
  },
});

const { clear } = slice.actions;

export { getList, getOne, createOne, getCount, clear };

export default slice.reducer;
