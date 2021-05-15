import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import { EntityListPayload } from 'types/payload';

import EventSidebar from './EventSidebar';
import {
  getList as getEvents,
  getCount,
  listSelector as eventsSelector,
  getParticipants,
  clear,
} from '../../store';

const EventSidebarContainer: FC = () => {
  const dispatch = useDispatch();
  const events = useSelector(eventsSelector);
  const { participants, loading } = useStore((state) => state.events);
  const { networks } = useStore((state) => state.auth.user);

  const handleClear = () => dispatch(clear());
  const loadEvents = (filters: EntityListPayload) =>
    dispatch(getEvents(filters));
  const loadCount = (filters: EntityListPayload) => dispatch(getCount(filters));
  const loadParticipants = () => dispatch(getParticipants());

  return (
    <EventSidebar
      events={events}
      participants={participants}
      loading={loading}
      loadEvents={loadEvents}
      loadCount={loadCount}
      loadParticipants={loadParticipants}
      handleClear={handleClear}
      networks={networks}
    />
  );
};

export default EventSidebarContainer;
