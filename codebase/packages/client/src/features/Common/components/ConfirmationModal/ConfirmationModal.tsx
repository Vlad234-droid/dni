import React, { FC } from 'react';
import styled from 'styled-components';
import BeansModal from '@beans/modal';
import Button from '@beans/button';

import Media from 'styles/media';

type Props = {
  renderContent: () => JSX.Element;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: FC<Props> = ({ renderContent, isOpen, onClose, onConfirm }) => (
  <BeansModal open={isOpen} onChange={onClose} id='join-network'>
    <Content>{renderContent()}</Content>
    <Actions>
      <Button onClick={onConfirm}>Confirm</Button>
      <Button onClick={onClose}>Cancel</Button>
    </Actions>
  </BeansModal>
);

export const Content = styled.div`
  font-size: 12px;
  line-height: 14px;
  margin-bottom: 16px;

  ${Media.tablet`
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 32px;
  `}

  ${Media.desktop`
    font-size: 16px;
    line-height: 20px;
  `}
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;

  button:not(last-child) {
    margin-right: 8px;
  }

  ${Media.tablet`
    margin-bottom: 24px;
  `}
`;


export default ConfirmationModal;
