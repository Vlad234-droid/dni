import { createEntityAdapter } from '@reduxjs/toolkit';

import { PostState } from './silce';
import { RootState } from 'store/rootReducer';
import { Post, PostForm, User } from '../config/types';

type PostFormSelector = (state: RootState) => PostForm;

const postFormSelector: PostFormSelector = (state) => {
  return state.post.form;
};

type PostFormPublishersSelector = (state: RootState) => User[];

const postFormPublishersSelector: PostFormPublishersSelector = (state) => {
  return state.post.publishers;
};

const postAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.id,
});

const postItemsSelector = postAdapter.getSelectors<PostState>((state) => state)
  .selectAll;

const postItemSelector = postAdapter.getSelectors<PostState>((state) => state)
  .selectById;

export type { PostFormSelector, PostFormPublishersSelector };

export {
  postAdapter,
  postFormSelector,
  postFormPublishersSelector,
  postItemSelector,
  postItemsSelector,
};
