import React, { FC } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { ToastSkin, toasterActions } from 'features/Toaster';
import { shareStory } from 'features/Auth';
import { CONTACT_API_ENABLED } from 'config/constants';
import { byIdSelector } from 'features/Network';

import { createOne } from '../../store';
import { FormData } from '../../config/types';
import PostCreate from './PostCreate';

type Props = {
  networkId: number;
  onClose: () => void;
};

const PostCreateContainer: FC<Props> = ({ networkId, onClose }) => {
  const dispatch = useDispatch();
  const network = useSelector(byIdSelector(networkId));

  const handleShareStory = async (data: FormData) =>
    await dispatch(
      shareStory({
        storyTitle: data.title,
        story: data.content,
        networkTitle: network!.title,
      }),
    );

  const handleCreatePost = async (data: FormData) =>
    await dispatch(
      createOne({
        title: data.title,
        content: data.content,
        slug: network!.slug,
        tenant: 4,
        network: [networkId],
        allowComments: true,
        anonymous: false,
        archived: false,
        published_at: null
      }),
    );

  const handleSubmit = async (data: FormData) => {
    const result = CONTACT_API_ENABLED ? await handleShareStory(data) : await handleCreatePost(data);

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
