import { createSlice, Dictionary } from '@reduxjs/toolkit';

import { imagesSrc } from '../config/media';
import { User, Post, PostForm } from '../config/types';
import { formReducer, postReducer } from './reducers';
import { postAdapter } from './selectors';
import { thunks } from './thunks';

const { createPosts, readPosts, updatePosts } = thunks;

export interface PostState {
  publishers: User[];
  form: PostForm;
  ids: (number | string)[];
  entities: Dictionary<Post>;
}

const initialState: PostState = {
  publishers: [
    {
      name: 'Yourself',
      avatarSrc: imagesSrc.avatar,
    },
    {
      name: 'Women at Tesco',
      avatarSrc: imagesSrc.avatar,
    },
    {
      name: 'Armed forces at Tesco',
      avatarSrc: imagesSrc.avatar,
    },
  ],
  form: {
    id: 0,
    createdBy: {
      name: 'Yourself',
      avatarSrc: imagesSrc.avatar,
    },
    title: '',
    description: '',
    attachments: [],
  },
  ...postAdapter.getInitialState(),
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    ...formReducer,
    ...postReducer,
  },
  extraReducers: {
    // C
    [createPosts.pending.type]: () => {
      console.log('post/create pending');
    },
    [createPosts.rejected.type]: () => {
      console.log('post/create rejected');
    },
    [createPosts.fulfilled.type]: (state, action) => {
      console.log('post/create fulfilled');
      state.form = initialState.form;
      postAdapter.addMany(state, action.payload);
    },
    // R
    [readPosts.pending.type]: () => {
      console.log('post/read pending');
    },
    [readPosts.rejected.type]: () => {
      console.log('post/read rejected');
    },
    [readPosts.fulfilled.type]: (state, action) => {
      console.log('post/read fulfilled');
      postAdapter.upsertMany(state, action.payload);
    },
    // U
    [updatePosts.pending.type]: () => {
      console.log('post/update pending');
    },
    [updatePosts.rejected.type]: () => {
      console.log('post/update rejected');
    },
    [updatePosts.fulfilled.type]: (state, action) => {
      console.log('post/update fulfilled');
      postAdapter.upsertMany(state, action.payload);
    },
    // D..
  },
});

export const actions = postSlice.actions;

export default postSlice.reducer;
