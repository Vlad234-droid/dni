import React, { FC } from 'react';
import Button from '@beans/button';

import { useGlobalModal } from '../context/GlobalModalContext';
import { ModalType } from '../config/types';

type Props = {
  id?: number;
  block?: boolean;
};

const ShareStoryButton: FC<Props> = ({ id, block = false }) => {
  const { showModal } = useGlobalModal();

  const openShareStoryModal = () => {
    showModal(ModalType.SHARE_STORY, {
      id,
    });
  };

  return (
    <Button data-testid='share-story-button' onClick={openShareStoryModal} block={block}>
      Share story
    </Button>
  );
};

export default ShareStoryButton;
