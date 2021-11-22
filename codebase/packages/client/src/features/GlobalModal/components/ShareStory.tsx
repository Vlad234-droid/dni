import React, { FC } from 'react';
import styled from 'styled-components';
import Modal from '@beans/modal';

import { PostCreate } from 'features/Post';
import Media from 'styles/media';

import { useGlobalModal } from '../context/GlobalModalContext';

const ShareStory: FC = () => {
  const { hideModal, store } = useGlobalModal();
  const { modalProps } = store || {};
  const { id } = modalProps || {};

  const handleModalToggle = () => {
    hideModal();
  };

  return (
    <Modal open={true} onChange={handleModalToggle} id='share-story' dynamicHeight maxHeight={{ global: '100vh' }}>
      <ModalContent>
        <PostCreate networkId={id} onClose={handleModalToggle} />
      </ModalContent>
    </Modal>
  );
};

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${Media.tablet`
    padding: 16px;
  `}
`;

export default ShareStory;
