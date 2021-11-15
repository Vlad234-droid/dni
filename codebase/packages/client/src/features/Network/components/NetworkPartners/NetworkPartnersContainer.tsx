import React, { FC } from 'react';
import { Organization } from '@dni-connectors/colleague-cms-api';

import Event from 'features/Event';
import useStore from 'hooks/useStore';

import NetworkPartners from './NetworkPartners';

type Props = {
  email?: string;
  partners?: Organization[];
  id: number;
  onLeave?: () => void;
  onJoin: () => void;
  events: Event[];
};

const NetworkPartnersContainer: FC<Props> = (props) => {
  const { networks = [] } = useStore((state) => state.auth.user);

  return (
    <NetworkPartners networksIds={networks} {...props} />
  );
};

export default NetworkPartnersContainer;
