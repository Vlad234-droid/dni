import React, { FC, useState } from 'react';
import Button from '@beans/button';

import useStore from 'hooks/useStore';
import useDispatch from 'hooks/useDispatch';
import { ConfirmationModal } from 'features/Common';
import { joinEvent, leaveEvent } from 'features/Auth';
import { useNotification } from 'features/Notification';

import { joinParticipant, leaveParticipant } from '../../store';

type Props = {
  id: number;
  disabled?: boolean;
};

const EventAction: FC<Props> = ({ id, disabled }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { events = [] } = useStore((state) => state.auth.user);
  const isJoined = events.includes(+id);
  const { refetchNotificationsWithDelay } = useNotification();

  const handleLeave = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleConfirmJoin = async () => {
    setIsModalOpen(false);

    await dispatch(joinEvent({ eventId: id }));
    dispatch(joinParticipant(id));
    refetchNotificationsWithDelay();
  };

  const handleConfirmLeave = async () => {
    setIsModalOpen(false);

    await dispatch(leaveEvent({ eventId: id }));
    dispatch(leaveParticipant(id));
    refetchNotificationsWithDelay();
  };

  return isJoined ? (
    <>
      <Button variant='primary' onClick={handleLeave}>
        Leave
      </Button>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirmLeave}
        renderContent={() => <p>After leaving this Event you won`t get any updates on it. Are you sure?</p>}
      />
    </>
  ) : (
    <Button disabled={disabled} variant='primary' onClick={handleConfirmJoin}>
      Join
    </Button>
  );
};

export default EventAction;
