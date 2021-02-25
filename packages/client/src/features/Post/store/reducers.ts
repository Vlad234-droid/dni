import { PayloadAction } from '@reduxjs/toolkit';

import { imagesSrc } from '../config/media';
import { TypeUser, TypeEmoji, TypePostStatus, InteracePostState } from '../config/types';

const postTemplate = {
  id: 0,
  slug: '',
  title: '',
  attachments: [],
  description: 'Write Something',
  postAs: '',
  sharedToken: '',
  emotions: [],
  // createdBy: null,
  createdBy: {
    name: 'Yourself',
    avatarSrc: imagesSrc.avatar,
  },
  createdAt: '',
  updatedAt: '',
  status: TypePostStatus.CREATING,
};

const reducers = {
  onPostCreatorClick: (state: InteracePostState) => {
    if (state.isPublishersMenuOpened) {
      state.isPublishersMenuOpened = false;
    }
  },

  onPostCustomSelectToggle: (state: InteracePostState) => {
    state.isPublishersMenuOpened = !state.isPublishersMenuOpened;
  },

  onPostPublisherChange: (
    state: InteracePostState,
    action: PayloadAction<TypeUser>,
  ) => {
    state.item.createdBy = action.payload;
    state.isPublishersMenuOpened = false;
  },

  onPostDescriptionChange: (
    state: InteracePostState,
    action: PayloadAction<string>,
  ) => {
    state.item.description = action.payload;
  },

  onPostDescriptionFocus: (
    state: InteracePostState,
    action: PayloadAction<string>,
  ) => {
    const { payload } = action;
    state.item.description =
      payload !== ('' || postTemplate.description) ? payload : '';
  },

  onPostDescriptionBlur: (
    state: InteracePostState,
    action: PayloadAction<string>,
  ) => {
    const { payload } = action;
    if (['', postTemplate.description].includes(payload)) {
      state.item.description = postTemplate.description;
    }
  },

  onPostFileDrag: () => {
    console.log();
  },

  onPostFileDrop: () => {
    console.log();
  },

  onPostFileChange: () => {
    console.log();
  },

  onPostFilePhotoChange: () => {
    console.log();
  },

  onPostFilePDFChange: () => {
    console.log();
  },

  onPostFileLoad: () => {
    console.log();
  },

  onPostFileLoadProgress: () => {
    console.log();
  },

  onPostFileLoadSuccess: () => {
    console.log();
  },

  onPostFileLoadError: () => {
    console.log();
  },

  onPostFileDelete: () => {
    console.log();
  },

  onPostPublish: (state: InteracePostState) => {
    state.item.status = TypePostStatus.PUBLISHED;
  },

  onPostEdit: (state: InteracePostState) => {
    state.item.status = TypePostStatus.CREATING;
  },

  onPostArchive: (state: InteracePostState) => {
    state.item.status = TypePostStatus.ARCHIVED;
  },

  onPostDelete: (state: InteracePostState) => {
    state.item = { ...postTemplate };
    state.item.status = TypePostStatus.CREATING;
  },

  onPostCopyLink: () => {
    console.log();
  },

  onPostLikeChoice: (
    state: InteracePostState,
    action: PayloadAction<TypeEmoji>,
  ) => {
    const { item } = state;
    const emoji = action.payload;
    const emotion = item.emotions.find(
      (emotion) => emotion.name === emoji.name,
    );

    if (emotion) {
      emotion.count = emotion.count + 1;
    } else {
      item.emotions[item.emotions.length] = { ...emoji };
    }
  },
};

export { reducers, postTemplate };
