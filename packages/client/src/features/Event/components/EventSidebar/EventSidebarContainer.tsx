import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import { EntityListPayload } from 'types/payload';

import EventSidebar from './EventSidebar';
import {
  getList as getEvents,
  listSelector as eventsSelector,
} from '../../store';

const EventSidebarContainer: FC = () => {
  const dispatch = useDispatch();
  const events = useSelector(eventsSelector);
  const { loading } = useStore((state) => state.events);

  const loadEvents = (filters: EntityListPayload) =>
    dispatch(getEvents(filters));

  return (
    <EventSidebar events={events} loading={loading} loadEvents={loadEvents} />
  );
};

export default EventSidebarContainer;
