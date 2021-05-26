import React, { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import { EntityListPayload } from 'types/payload';

import {
  getList as getEvents,
  getCount,
  clear,
  listSelector as eventsSelector,
  getParticipants,
  Filter,
} from '../../store';
import { ALL } from '../../config/contstants';
import EventList from './EventList';

const EventSidebarContainer: FC = () => {
  const dispatch = useDispatch();
  const events = useSelector(eventsSelector);
  const {
    participants,
    loading,
    error: listError,
    meta: { total, error: countError },
  } = useStore((state) => state.events);
  const { networks } = useStore((state) => state.auth.user);
  const [page, setPage] = useState<number>(0);
  const [filter, setFilter] = useState<Filter>(ALL);
  const errorMessage = useMemo(
    () => listError || countError || participants.error,
    [participants, listError, countError],
  );

  const loadEvents = (filters: EntityListPayload) =>
    dispatch(getEvents(filters));
  const loadCount = (filters: EntityListPayload) => dispatch(getCount(filters));
  const handleClear = () => dispatch(clear());
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
      handleClear={handleClear}
      loadParticipants={loadParticipants}
      page={page}
      onPageChange={handlePageChange}
      filter={filter}
      onFilterChange={handleFilterChange}
      error={errorMessage}
    />
  );
};

export default EventSidebarContainer;
