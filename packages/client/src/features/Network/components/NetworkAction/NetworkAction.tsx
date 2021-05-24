import React, { FC, useCallback, useState } from 'react';
import Button from '@beans/button';

import useStore from 'hooks/useStore';
import useDispatch from 'hooks/useDispatch';
import { joinNetwork, leaveNetwork } from 'features/Auth';

import { ModalJoin, ModalLeave } from '../Modal';
import { joinParticipant, leaveParticipant } from '../../store';

type Props = {
  id: number;
  onLeave?: () => void;
  onJoin?: () => void;
};

const NetworkAction: FC<Props> = ({ id, onLeave, onJoin }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { networks = [], params } = useStore((state) => state.auth.user);
  const employeeNumber = params?.employeeNumber;
  const isJoined = networks.includes(+id);

  const handleJoin = () => setIsModalOpen(true);
  const handleLeave = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleConfirmLeave = useCallback(async () => {
    setIsModalOpen(false);
    if (employeeNumber) {
      await dispatch(leaveNetwork({ employeeNumber, networkId: id }));
      dispatch(leaveParticipant(id));
    }
    onLeave && onLeave();
  }, [employeeNumber]);

  const handleConfirmJoin = useCallback(async () => {
    setIsModalOpen(false);
    if (employeeNumber) {
      await dispatch(joinNetwork({ employeeNumber, networkId: id }));
      dispatch(joinParticipant(id));
    }
    onJoin && onJoin();
  }, [employeeNumber]);

  return isJoined ? (
    <>
      <Button variant='primary' onClick={handleLeave}>
        Leave
      </Button>
      <ModalLeave
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirmLeave}
      />
    </>
  ) : (
    <>
      <Button variant='primary' onClick={handleJoin}>
        Join
      </Button>
      <ModalJoin
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirmJoin}
      />
    </>
  );
};

export default NetworkAction;
