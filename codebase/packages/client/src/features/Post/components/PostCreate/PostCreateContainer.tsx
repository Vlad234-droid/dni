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

  const handleShareStory = async (data: FormData) => {
    const result = await dispatch(
      shareStory({
        storyTitle: data.title,
        story: data.content,
        networkTitle: network!.title,
      }),
    );

    // @ts-ignore
    if (shareStory.fulfilled.match(result)) {
      dispatch(
        toasterActions.createToast({
          skin: ToastSkin.ENTITY_CREATE_SUCCESS,
        }),
      );
      onClose();
    } else {
      dispatch(
        toasterActions.createToast({
          skin: ToastSkin.ENTITY_CREATE_ERROR,
        }),
      );
    }
  }
 // TODO: temporary solution
  const handleCreatePost = async (data: FormData) => {
    const result = await dispatch(
      createOne({
        title: data.title,
        content: data.content,
        slug: `${network!.slug}-${String(Date.now())}`,
        tenant: 4,
        network: [networkId],
        allowComments: true,
        anonymous: false,
        archived: false,
        published_at: null
      }),
    );

    // @ts-ignore
    if (createOne.fulfilled.match(result)) {
      dispatch(
        toasterActions.createToast({
          skin: ToastSkin.ENTITY_CREATE_SUCCESS,
        }),
      );
      onClose();
    } else {
      dispatch(
        toasterActions.createToast({
          skin: ToastSkin.ENTITY_CREATE_ERROR,
        }),
      );
    }
  }

  const handleSubmit = async (data: FormData) => {
    if (CONTACT_API_ENABLED) {
      await handleShareStory(data);
    } else {
      await handleCreatePost(data)
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
