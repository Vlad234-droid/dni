import React, { FC, useEffect } from 'react';
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
} from '../../store';

const EventSidebarContainer: FC = () => {
  const dispatch = useDispatch();
  const events = useSelector(eventsSelector);
  const {
    participants,
    loading,
    meta: { count },
  } = useStore((state) => state.events);

  const loadEvents = (filters: EntityListPayload) =>
    dispatch(getEvents(filters));

  const loadCount = (filters: EntityListPayload) => dispatch(getCount(filters));

  useEffect(() => {
    dispatch(getParticipants());
  }, []);

  return (
    <EventSidebar
      count={count}
      events={events}
      participants={participants}
      loading={loading}
      loadEvents={loadEvents}
      loadCount={loadCount}
    />
  );
};

export default EventSidebarContainer;
