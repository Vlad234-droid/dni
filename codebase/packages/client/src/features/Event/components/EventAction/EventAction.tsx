import React, {FC, useCallback, useState} from 'react';
import Button from '@beans/button';
import BeansModal from '@beans/modal';

import useStore from 'hooks/useStore';
import useDispatch from 'hooks/useDispatch';
import { ConfirmationModal } from 'features/Common';
import { joinEvent, leaveEvent } from 'features/Auth';

import { joinParticipant, leaveParticipant } from '../../store';
import {ModalLeave} from "../../../Network/components/ConfirmationModal";

type Props = {
  id: number;
  disabled?: boolean;
};

const EventAction: FC<Props> = ({ id, disabled }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { events = [], params } = useStore((state) => state.auth.user);
  const employeeNumber = params?.employeeNumber;
  const isJoined = events.includes(+id);

  const handleLeave = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleConfirmJoin = useCallback(
    async () => {
      setIsModalOpen(false);

      if (employeeNumber) {
        await dispatch(joinEvent({ employeeNumber, eventId: id }));
        dispatch(joinParticipant(id));
      }
    },
    [employeeNumber],
  );

  const handleConfirmLeave = useCallback(
    async () => {
      setIsModalOpen(false);

      if (employeeNumber) {
        await dispatch(leaveEvent({ employeeNumber, eventId: id }));
        dispatch(leaveParticipant(id));
      }
    },
    [employeeNumber],
  );

  return isJoined ? (
    <>
      <Button variant='primary' onClick={handleLeave}>
        Leave
      </Button>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirmLeave}
        renderContent={() => (
          <p>After leaving this Event you won`t get any updates on it. Are you sure?</p>
        )}
      />
    </>
  ) : (
    <Button disabled={disabled} variant='primary' onClick={handleConfirmJoin}>
      Join
    </Button>
  );
};

export default EventAction;
