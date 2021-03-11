import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import API from 'utils/api';
import { DEFAULT_META } from 'utils/storeHelper';

import * as T from './types';

const initialState: T.State = T.EntityAdapter.getInitialState({
  isLoading: false,
  error: null,
  meta: DEFAULT_META,
});

const getList = createAsyncThunk<T.ListResponse>(
  T.LIST_ACTION,
  async () => await API.networks.fetchAll<T.ListResponse>(),
);

const getOne = createAsyncThunk<T.OneResponse, T.OnePayload>(
  T.ONE_ACTION,
  async ({ id }: T.OnePayload) =>
    await API.networks.fetchOne<T.OneResponse>(id),
);

const setOne = createAsyncThunk<T.OneResponse, T.SetOnePayload>(
  T.SET_ONE_ACTION,
  async ({ data }) => await API.networks.one<T.OneResponse>(data),
);

const slice = createSlice({
  name: T.ROOT,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const startLoading = (state: T.State) => {
      state.isLoading = true;
    };
    const stopLoading = (state: T.State) => {
      state.isLoading = false;
    };

    builder
      .addCase(getList.pending, startLoading)
      .addCase(getList.fulfilled, (state: T.State, action) => {
        const { data, count, total, page, pageCount } = action.payload;
        T.EntityAdapter.upsertMany(state, data);
        const meta = state.meta;
        state.meta = {
          ...meta,
          count,
          total,
          page,
          pageCount,
        };
        state.isLoading = false;
      })
      .addCase(getList.rejected, stopLoading)
      .addCase(getOne.pending, startLoading)
      .addCase(getOne.fulfilled, (state: T.State, action) => {
        T.EntityAdapter.upsertOne(state, action.payload);
        state.isLoading = false;
      })
      .addCase(getOne.rejected, stopLoading)
      .addCase(setOne.pending, startLoading);
  },
});

export { getList, getOne, setOne };

export default slice.reducer;
