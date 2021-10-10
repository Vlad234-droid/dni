import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API from 'utils/api';
import Loading from 'types/loading';
import { FilterPayload } from 'types/payload';

import { reactions, emojis } from './mockedData';
import * as T from './types';

const initialState: T.State = T.EntityAdapter.getInitialState({
  loading: Loading.IDLE,
  error: undefined,
  emojis: [],
});

// const getEmojis = createAsyncThunk<T.EmojiResponse>(
//   T.EMOJIS_ACTION,
//   async () => await API.emojis.getEmojis<T.EmojiResponse>(),
// );

// const getList = createAsyncThunk<T.ListResponse, FilterPayload>(
//   T.LIST_ACTION,
//   async (filters) => await API.user.reactions<T.ListResponse>(filters),
// );

const changeReactions = createAsyncThunk<T.OneResponse, T.OnePayload>(
  T.CHANGE_ACTION,
  async (data) => await API.user.changeReactions<T.OneResponse>(data),
);

// mocked data start
const getEmojisList = () => Promise.resolve(emojis);

const getReactions = (filters: FilterPayload) => Promise.resolve(reactions);

const getList = createAsyncThunk<T.ListResponse, FilterPayload>(
  T.LIST_ACTION,
  // @ts-ignore
  async (filters) => await getReactions(filters),
);

const getEmojis = createAsyncThunk<T.EmojiResponse>(T.EMOJIS_ACTION, async () => await getEmojisList());
// mocked data end

const slice = createSlice({
  name: T.ROOT,
  initialState,
  reducers: {
    clear(state) {
      T.EntityAdapter.removeAll(state);
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
      .addCase(getEmojis.pending, setPending)
      .addCase(getEmojis.fulfilled, (state: T.State, { payload }) => {
        state.emojis = payload;
        setSucceeded(state);
      })
      .addCase(getEmojis.rejected, setFailed)
      .addCase(getList.pending, setPending)
      .addCase(getList.fulfilled, (state: T.State, { payload }) => {
        T.EntityAdapter.upsertMany(state, payload);
        setSucceeded(state);
      })
      .addCase(getList.rejected, setFailed)
      .addCase(changeReactions.pending, setPending)
      .addCase(changeReactions.fulfilled, (state: T.State, action) => {
        setSucceeded(state);
      })
      .addCase(changeReactions.rejected, setFailed)
      .addDefaultCase((state) => state);
  },
});

const { clear } = slice.actions;

export { getEmojis, getList, changeReactions, clear };

export default slice.reducer;
