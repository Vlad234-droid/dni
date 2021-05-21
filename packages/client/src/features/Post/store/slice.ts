import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import API from 'utils/api';
import { FilterPayload, PaginationPayload } from 'types/payload';
import { DEFAULT_META } from 'config/constants';
import Loading from 'types/loading';

import * as T from './types';

const initialState: T.State = T.EntityAdapter.getInitialState({
  loading: Loading.IDLE,
  error: undefined,
  meta: DEFAULT_META,
});

const getList = createAsyncThunk<
  T.ListResponse,
  FilterPayload & PaginationPayload
>(
  T.LIST_ACTION,
  async (filters) => await API.posts.fetchAll<T.ListResponse>(filters),
);

const getOne = createAsyncThunk<T.OneResponse, T.OnePayload>(
  T.ONE_ACTION,
  async ({ id }: T.OnePayload) => await API.posts.fetchOne<T.OneResponse>(id),
);

const createOne = createAsyncThunk<T.OneResponse, T.SetOnePayload>(
  T.SET_ONE_ACTION,
  async (data) => await API.posts.create<T.OneResponse>(data),
);

const getCount = createAsyncThunk<number, FilterPayload>(
  T.COUNT_ACTION,
  (data) => API.posts.count<number>(data),
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
    const setPending = (state: T.State) => {
      state.loading = Loading.PENDING;
    };

    const setSucceeded = (state: T.State) => {
      state.loading = Loading.SUCCEEDED;
    };

    const setFailed = (state: T.State) => {
      state.loading = Loading.FAILED;
    };

    builder
      .addCase(getCount.pending, (state: T.State) => {
        state.meta.loading = Loading.PENDING;
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
      .addCase(getCount.rejected, (state: T.State) => {
        state.meta.loading = Loading.FAILED;
      })
      .addCase(getList.pending, setPending)
      .addCase(getList.fulfilled, (state: T.State, action) => {
        const data = action.payload;
        T.EntityAdapter.upsertMany(state, data);
        const meta = state.meta;
        state.meta = {
          ...meta,
        };
        setSucceeded(state);
      })
      .addCase(getList.rejected, setFailed)
      .addCase(getOne.pending, setPending)
      .addCase(getOne.fulfilled, (state: T.State, action) => {
        T.EntityAdapter.upsertOne(state, action.payload);
        setSucceeded(state);
      })
      .addCase(getOne.rejected, setFailed)
      .addCase(createOne.pending, setPending)
      .addCase(createOne.fulfilled, (state: T.State, action) => {
        T.EntityAdapter.upsertOne(state, action.payload);
        setSucceeded(state);
      })
      .addCase(createOne.rejected, setFailed)
      .addDefaultCase((state) => state);
  },
});

const { clear } = slice.actions;

export { getList, getOne, createOne, getCount, clear };

export default slice.reducer;
