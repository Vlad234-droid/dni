import { FC, useCallback } from 'react';
import Button from '@beans/button';

import useStore from 'hooks/useStore';
import useDispatch from 'hooks/useDispatch';

import { joinNetwork, leaveNetwork } from 'features/Auth/store';

type Props = {
  id: number;
  onLeave?: () => void;
  onJoin?: () => void;
};

const NetworkAction: FC<Props> = ({ id, onLeave, onJoin }) => {
  const dispatch = useDispatch();

  const { networks = [], params } = useStore((state) => state.auth.user);
  const employeeNumber = params?.employeeNumber;
  const isJoined = networks.includes(+id);

  const handleJoin = useCallback(
    async (networkId: number) => {
      if (employeeNumber) {
        await dispatch(joinNetwork({ employeeNumber, networkId }));
      }
      onJoin && onJoin();
    },
    [employeeNumber],
  );

  const handleLeave = useCallback(
    async (networkId: number) => {
      if (employeeNumber) {
        await dispatch(leaveNetwork({ employeeNumber, networkId }));
      }
      onLeave && onLeave();
    },
    [employeeNumber],
  );

  return isJoined ? (
    <Button variant='primary' onClick={() => handleLeave(id)}>
      Leave
    </Button>
  ) : (
    <Button variant='primary' onClick={() => handleJoin(id)}>
      Join
    </Button>
  );
};

export default NetworkAction;
