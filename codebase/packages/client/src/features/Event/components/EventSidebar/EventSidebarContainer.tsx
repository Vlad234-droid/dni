import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import { EntityListPayload } from 'types/payload';

import EventSidebar from './EventSidebar';
import { getList as getEvents, listSelector as eventsSelector, getParticipants, clear } from '../../store';

const EventSidebarContainer: FC = () => {
  const dispatch = useDispatch();
  const events = useSelector(eventsSelector);
  const { participants, loading, error } = useStore((state) => state.events);
  const { eventError } = useStore(state => state.auth);
  const { networks } = useStore((state) => state.auth.user);
  const errorMessage = useMemo(() => error || participants.error || eventError, [participants, error, eventError]);

  const handleClear = () => dispatch(clear());
  const loadEvents = (filters: EntityListPayload) => dispatch(getEvents(filters));
  const loadParticipants = () => dispatch(getParticipants());

  return (
    <EventSidebar
      events={events}
      participants={participants!.data}
      loading={loading}
      loadEvents={loadEvents}
      loadParticipants={loadParticipants}
      handleClear={handleClear}
      networks={networks}
      error={errorMessage}
    />
  );
};

export default EventSidebarContainer;
