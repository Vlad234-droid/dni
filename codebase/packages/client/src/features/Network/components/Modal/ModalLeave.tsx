import React, { FC } from 'react';
import BeansModal from '@beans/modal';

import { ConfirmationModal } from 'features/Common';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ModalLeave: FC<Props> = ({ isOpen, onClose, onConfirm }) => (
  <BeansModal open={isOpen} onChange={onClose} id='join-network'>
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      renderContent={() => (
        <p>
          By leaving this Network you would also leave all linked events. Are you
          sure?
        </p>
      )}
    />
  </BeansModal>
);

export default ModalLeave;
