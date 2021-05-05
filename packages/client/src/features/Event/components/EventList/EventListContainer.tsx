import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import { EntityListPayload } from 'types/payload';

import EventList from './EventList';
import {
  getList as getEvents,
  getCount,
  listSelector as eventsSelector,
  getParticipants,
  Filter,
  ALL,
} from '../../store';

const EventSidebarContainer: FC = () => {
  const dispatch = useDispatch();
  // TODO: select events by active filter
  const events = useSelector(eventsSelector);
  const {
    participants,
    loading,
    meta: { total },
  } = useStore((state) => state.events);
  const { networks = [] } = useStore((state) => state.auth.user);

  const [page, setPage] = useState<number>(0);
  const [filter, setFilter] = useState<Filter>(ALL);

  const loadEvents = (filters: EntityListPayload) =>
    dispatch(getEvents(filters));
  const loadCount = (filters: EntityListPayload) => dispatch(getCount(filters));
  const loadParticipants = () => dispatch(getParticipants());

  const handlePageChange = () => setPage(page + 1);
  const handleFilterChange = (filter: Filter) => setFilter(filter);

  return (
    <EventList
      events={events}
      participants={participants}
      loading={loading}
      total={total}
      networks={networks}
      loadEvents={loadEvents}
      loadCount={loadCount}
      loadParticipants={loadParticipants}
      page={page}
      onPageChange={handlePageChange}
      filter={filter}
      onFilterChange={handleFilterChange}
    />
  );
};

export default EventSidebarContainer;
