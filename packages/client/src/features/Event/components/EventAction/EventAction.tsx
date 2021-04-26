import { FC, useCallback } from 'react';
import Button from '@beans/button';

import useStore from 'hooks/useStore';
import useDispatch from 'hooks/useDispatch';

import { joinEvent, leaveEvent } from 'features/Auth/store';

type Props = {
  id: number;
  disabled?: boolean;
};

const EventAction: FC<Props> = ({ id, disabled }) => {
  const dispatch = useDispatch();

  const { events = [], params } = useStore((state) => state.auth.user);
  const employeeNumber = params?.employeeNumber;
  const isJoined = events.includes(+id);

  const handleJoin = useCallback(
    async (eventId: number) => {
      if (employeeNumber) {
        await dispatch(joinEvent({ employeeNumber, eventId }));
      }
    },
    [employeeNumber],
  );

  const handleLeave = useCallback(
    async (eventId: number) => {
      if (employeeNumber) {
        await dispatch(leaveEvent({ employeeNumber, eventId }));
      }
    },
    [employeeNumber],
  );

  return isJoined ? (
    <Button variant='primary' onClick={() => handleLeave(id)}>
      Leave
    </Button>
  ) : (
    <Button
      disabled={disabled}
      variant='primary'
      onClick={() => handleJoin(id)}
    >
      Join
    </Button>
  );
};

export default EventAction;
