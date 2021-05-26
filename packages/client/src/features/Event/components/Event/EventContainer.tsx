import React, { FC, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';

import EventComponent from './Event';
import { getParticipants, getOne, byIdSelector } from '../../store';

type Props = {
  id: number;
};

const EventContainer: FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const event = useSelector(byIdSelector(id));
  const { loading, participants, error } = useStore((state) => state.events);
  const errorMessage = useMemo(() => error || participants.error, [
    error,
    participants,
  ]);
  const loadEvent = () => dispatch(getOne({ id }));
  const loadParticipants = () => dispatch(getParticipants());

  useEffect(() => {
    dispatch(getParticipants());
  }, []);

  return (
    <EventComponent
      id={id}
      event={event}
      loading={loading}
      participants={participants!.data![id] || 0}
      loadEvent={loadEvent}
      loadParticipants={loadParticipants}
      error={errorMessage}
    />
  );
};

export default EventContainer;
