import React, { FC, useMemo, useState } from 'react';

import useStore from 'hooks/useStore';
import { addDuration } from 'utils/date';
import { DEFAULT_FILTERS } from 'config/constants';
import useDispatch from 'hooks/useDispatch';

import { getPayloadWhere } from '../../utils';
import useFetchEvents from '../../hooks/useFetchEvents';
import EventCarousel from './EventCarousel';
import { getParticipants } from '../../store';

const MAX_VISIBLE_ITEMS = 5;

const EventCarouselContainer: FC = () => {
  const dispatch = useDispatch();
  const { participants } = useStore((state) => state.events);
  const { networks } = useStore((state) => state.auth.user);

  const [filters] = useState({
    ...getPayloadWhere(networks),
    ...DEFAULT_FILTERS,
    _start: 0,
    _limit: MAX_VISIBLE_ITEMS,
    endDate_gte: new Date(),
    startDate_lte: addDuration({ weeks: 2 }),
  });

  const [loading, list, hasMore, listError, countError] = useFetchEvents(
    filters,
  );
  const errorMessage = useMemo(
    () => listError || countError || participants.error,
    [participants, listError, countError],
  );
  const loadParticipants = () => dispatch(getParticipants());

  return (
    <EventCarousel
      events={list!}
      participants={participants!.data}
      loading={loading}
      error={errorMessage}
      loadParticipants={loadParticipants}
      hasMore={hasMore}
    />
  );
};

export default EventCarouselContainer;
