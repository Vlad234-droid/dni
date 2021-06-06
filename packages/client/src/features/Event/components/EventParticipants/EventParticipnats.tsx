import React, { FC } from 'react';
import Icon from '@beans/icon';

type Props = {
  participants?: number;
  maxParticipants?: number;
};

const EventParticipants: FC<Props> = ({
  participants = 0,
  maxParticipants,
}) => (
  <div>
    <Icon graphic='account' size={'sm'} />
    {participants}
    {maxParticipants && ` / ${maxParticipants}`}
    &nbsp; participants
  </div>
);

export default EventParticipants;
