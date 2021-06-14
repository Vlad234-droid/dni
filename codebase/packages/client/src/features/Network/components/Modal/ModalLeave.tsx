import React, { FC } from 'react';
import Button from '@beans/button';
import BeansModal from '@beans/modal';

import { Content, Actions } from './styled';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ModalLeave: FC<Props> = ({ isOpen, onClose, onConfirm }) => (
  <BeansModal open={isOpen} onChange={onClose} id='join-network'>
    <Content>
      <p>
        By leaving this Network you would also leave all linked events. Are you
        sure?
      </p>
    </Content>
    <Actions>
      <Button onClick={onConfirm}>Yes</Button>
      <Button onClick={onClose}>No</Button>
    </Actions>
  </BeansModal>
);

export default ModalLeave;
