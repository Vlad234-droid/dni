import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import API from 'utils/api';
import { DEFAULT_META, FilterPayload } from 'utils/storeHelper';

import * as T from './types';

const initialState: T.State = T.EntityAdapter.getInitialState({
  isLoading: false,
  error: null,
  meta: DEFAULT_META,
});

const getList = createAsyncThunk<T.ListResponse, FilterPayload>(
  T.LIST_ACTION,
  async (filters) => await API.events.fetchAll<T.ListResponse>(filters),
);

const getOne = createAsyncThunk<T.OneResponse, T.OnePayload>(
  T.ONE_ACTION,
  async ({ id }: T.OnePayload) => await API.events.fetchOne<T.OneResponse>(id),
);

const createOne = createAsyncThunk<T.OneResponse, T.SetOnePayload>(
  T.SET_ONE_ACTION,
  async (data) => await API.events.create<T.OneResponse>(data),
);

const uploadImage = createAsyncThunk<
  Pick<T.OneResponse, 'id' | 'image'>,
  T.UploadImgPayload
>(T.UPLOAD_IMG_ACTION, async ({ id, image }) => {
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
      .addCase(uploadImage.pending, startLoading)
      .addCase(uploadImage.fulfilled, (state: T.State, action) => {
        T.EntityAdapter.updateOne(state, {
          ...action.payload,
          changes: { image: action.payload.image },
        });
        stopLoading(state);
      })
      .addCase(uploadImage.rejected, stopLoading);
  },
});

export { getList, getOne, createOne, uploadImage };

export default slice.reducer;
