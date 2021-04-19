import { FC, useCallback } from 'react';
import Button from '@beans/button';

import useStore from 'hooks/useStore';
import useDispatch from 'hooks/useDispatch';

import { takePartEvent, missOutEvent } from 'features/Auth/store';

type Props = {
  id: number;
};

const EventAction: FC<Props> = ({ id }) => {
  const dispatch = useDispatch();

  const { events = [], params } = useStore((state) => state.auth.user);
  const employeeNumber = params?.employeeNumber;
  const isJoined = events.includes(+id);

  const handleJoin = useCallback(
    async (eventId: number) => {
      if (employeeNumber) {
        await dispatch(takePartEvent({ employeeNumber, eventId }));
      }
    },
    [employeeNumber],
  );

  const handleLeave = useCallback(
    async (eventId: number) => {
      if (employeeNumber) {
        await dispatch(missOutEvent({ employeeNumber, eventId }));
      }
    },
    [employeeNumber],
  );

  return isJoined ? (
    <Button variant='primary' onClick={() => handleLeave(id)}>
      Miss out
    </Button>
  ) : (
    <Button variant='primary' onClick={() => handleJoin(id)}>
      Take part
    </Button>
  );
};

export default EventAction;
