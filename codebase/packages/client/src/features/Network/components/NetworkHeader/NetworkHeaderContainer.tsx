import React, { FC } from 'react';

import Event from 'features/Event';
import useStore from 'hooks/useStore';

import NetworkHeader from './NetworkHeader';

type Props = {
  id: number;
  title: string;
  email: string;
  onLeave: () => void;
  onJoin: () => void;
  events: Event[];
  slug: string;
};

const NetworkHeaderContainer: FC<Props> = ({ id, ...rest }) => {
  const { networks = [] } = useStore((state) => state.auth.user);

  return (
    <NetworkHeader
      id={id}
      networks={networks}
      {...rest}
    />
  );
};

export default NetworkHeaderContainer;
