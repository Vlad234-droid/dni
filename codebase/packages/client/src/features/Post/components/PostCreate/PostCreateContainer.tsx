import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { ToastSkin, toasterActions } from 'features/Toaster';
import { shareStory } from 'features/Auth';

import { FormData } from '../../config/types';
import PostCreate from './PostCreate';

type Props = {
  networkTitle: string;
  onClose: () => void;
};

const PostCreateContainer: FC<Props> = ({ networkTitle, onClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (data: FormData) => {
    const result = await dispatch(
      shareStory({
        storyTitle: data.title,
        story: data.content,
        networkTitle,
      }),
    );

    // @ts-ignore
    if (shareStory.fulfilled.match(result)) {
      dispatch(
        toasterActions.createToast({
          skin: ToastSkin.ENTITY_CREATE_SUCCESS,
        }),
      );
    } else {
      dispatch(
        toasterActions.createToast({
          skin: ToastSkin.ENTITY_CREATE_ERROR,
        }),
      );
    }
  };

  return (
    <PostCreate
      onSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};

export default PostCreateContainer;
