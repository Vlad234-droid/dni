import { createSlice } from '@reduxjs/toolkit';

import { imagesSrc } from '../config/media';
import { InteracePostState } from '../config/types';
import { reducers, postTemplate } from './reducers';

const initialState: InteracePostState = {
  user: {
    name: 'Yourself',
    avatarSrc: imagesSrc.avatar,
  },
  item: { ...postTemplate },
  publishersList: [
    {
      name: 'Yourself',
      avatarSrc: imagesSrc.avatar,
    },
    {
      name: 'Women at Tesco',
      avatarSrc: imagesSrc.avatar,
    },
    {
      name: 'Armed Forces at Tesco',
      avatarSrc: imagesSrc.avatar,
    },
  ],
  isPublishersMenuOpened: false,
  isFileDragging: false,
  isFileDropped: false,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers,
});

export const actions = postSlice.actions;

export default postSlice.reducer;
