import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ToastSkin, toasterActions } from 'features/Toaster';
import { shareStory } from 'features/Auth';
import { CONTACT_API_ENABLED } from 'config/constants';
import Network, { byIdSelector, listSelector, getList } from 'features/Network';
import { RootState } from 'store/rootReducer';
import useStore from 'hooks/useStore';

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
  const networks = useSelector((state: RootState) => listSelector(state, undefined));
  const { loading, error } = useStore((state) => state.networks);

  useEffect(() => {
    dispatch(
      // @ts-ignore
      getList({}),
    );
  }, []);

  // TODO: name and location fields are not sent
  const handleShareStory = async ({ title, story, networkTitle, name, location }: FormData) => {
    const result = await dispatch(
      shareStory({
        storyTitle: title,
        story,
        networkTitle,
        name,
        location,
      }),
    );

    // @ts-ignore
    if (shareStory.fulfilled.match(result)) {
      dispatch(
        toasterActions.createToast({
          skin: ToastSkin.STORY_CREATE_SUCCESS,
        }),
      );
      onClose();
    } else {
      dispatch(
        toasterActions.createToast({
          skin: ToastSkin.STORY_CREATE_ERROR,
        }),
      );
      onClose();
    }
  };

  // TODO: temporary solution - remove
  const handleCreatePost = async (data: FormData, network?: Network) => {
    // to narrow thw type
    if (!network) return;

    const result = await dispatch(
      createOne({
        title: data.title,
        content: data.story,
        authorName: data.name,
        authorLocation: data.location,
        slug: `${network.slug}-${String(Date.now())}`,
        tenant: 4,
        network: [network.id],
        allowComments: true,
        anonymous: false,
        archived: false,
        published_at: null,
      }),
    );

    // @ts-ignore
    if (createOne.fulfilled.match(result)) {
      dispatch(
        toasterActions.createToast({
          skin: ToastSkin.STORY_CREATE_SUCCESS,
        }),
      );
      onClose();
    } else {
      dispatch(
        toasterActions.createToast({
          skin: ToastSkin.STORY_CREATE_ERROR,
        }),
      );
      onClose();
    }
  };

  const handleSubmit = async (data: FormData, network?: Network) => {
    if (CONTACT_API_ENABLED) {
      await handleShareStory(data);
    } else {
      await handleCreatePost(data, network);
    }
  };

  return (
    <PostCreate
      onSubmit={handleSubmit}
      onClose={onClose}
      networks={network ? [network] : networks}
      loading={loading}
      error={error}
    />
  );
};

export default PostCreateContainer;
