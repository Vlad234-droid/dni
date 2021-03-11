import { createAsyncThunk } from '@reduxjs/toolkit';

import { postItemSelector } from '../store/selectors';

const createPostsAsync = async (
  {
    ids,
  }: {
    ids: (number | string)[];
  },
  { getState }: { getState: () => any },
) => {
  try {
    const post = getState().post.form;
    // request POST

    // response
    return [
      {
        id: new Date().getTime(),
        slug: '/slug',
        title: post.title,
        postAs: '',
        status: 'published',
        attachments: post.attachments,
        description: post.description,
        sharedToken: '',
        emotions: [],
        createdBy: post.createdBy,
        createdAt: new Date().toLocaleTimeString(),
        updatedAt: '',
      },
    ];
  } catch (error) {
    return 'post/create error';
  }
};

const readPostsAsync = async (
  {
    ids,
    changes,
  }: {
    ids: (number | string)[];
    changes?: any;
  },
  { getState }: { getState: () => any },
) => {
  try {
    const id = ids[0];
    const post = postItemSelector(getState().post, id);
    // request GET

    // response
    return [
      {
        id,
        ...post,
        ...changes,
      },
    ];
  } catch (error) {
    return 'post/read error';
  }
};

const updatePostsAsync = async (
  {
    ids,
    changes,
  }: {
    ids: (number | string)[];
    changes?: any;
  },
  { getState }: { getState: () => any },
) => {
  try {
    const id = ids[0];
    const post = postItemSelector(getState().post, id);
    // request PUT

    // response
    return [
      {
        id,
        ...post,
        ...changes,
        updatedAt: new Date().toLocaleTimeString(),
      },
    ];
  } catch (error) {
    return 'post/update error';
  }
};

const thunks = {
  // C
  createPosts: createAsyncThunk('post/create', createPostsAsync),
  // R
  readPosts: createAsyncThunk('post/read', readPostsAsync),
  // U
  updatePosts: createAsyncThunk('post/update', updatePostsAsync),
  // D..
};

export { thunks };
