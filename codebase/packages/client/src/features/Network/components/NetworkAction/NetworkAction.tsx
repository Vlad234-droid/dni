import React, { FC, useState } from 'react';
import Button from '@beans/button';

import useStore from 'hooks/useStore';
import useDispatch from 'hooks/useDispatch';
import { joinNetwork, leaveNetwork, leaveEvent } from 'features/Auth';
import { useNotification, ModalEmailSettings } from 'features/Notification';
import Event from 'features/Event';

import { ModalJoin, ModalLeave } from '../Modal';
import { joinParticipant, leaveParticipant } from '../../store';

type Props = {
  id: number;
  events: Event[];
  onLeave?: () => void;
  onJoin?: () => void;
};

const NetworkAction: FC<Props> = ({ id, events, onLeave, onJoin }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const { networks = [] } = useStore((state) => state.auth.user);
  const isJoined = networks.includes(+id);
  const { refetchNotificationsWithDelay } = useNotification();

  const handleJoin = () => setIsModalOpen(true);
  const handleLeave = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleConfirmLeave = async () => {
    setIsModalOpen(false);

    events.forEach(({ id }) => {
      dispatch(leaveEvent({ eventId: id }));
    });
    await dispatch(leaveNetwork({ networkId: id }));
    dispatch(leaveParticipant(id));

    refetchNotificationsWithDelay();

    onLeave && onLeave();
  };

  const handleConfirmJoin = () => {
    setIsModalOpen(false);
    setSettingsModalOpen(true);
  };

  const handleConfirmSettings = async () => {
    await dispatch(joinNetwork({ networkId: id }));
    dispatch(joinParticipant(id));

    refetchNotificationsWithDelay();
    setSettingsModalOpen(false);

    onJoin && onJoin();
  }

  const handleSettingsModalClose = async () => {
    setSettingsModalOpen(false);
    await handleConfirmSettings();
  };

  return isJoined ? (
    <>
      <Button variant='secondary' onClick={handleLeave}>
        Leave
      </Button>
      <ModalLeave isOpen={isModalOpen} onClose={handleModalClose} onConfirm={handleConfirmLeave} />
    </>
  ) : (
    <>
      <Button variant='primary' onClick={handleJoin}>
        Join
      </Button>
      <ModalJoin isOpen={isModalOpen} onClose={handleModalClose} onConfirm={handleConfirmJoin} />
      <ModalEmailSettings
        isOpen={isSettingsModalOpen}
        onClose={handleSettingsModalClose}
        onConfirm={handleConfirmSettings}
        onError={() => setSettingsModalOpen(false)}
      />
    </>
  );
};

export default NetworkAction;
