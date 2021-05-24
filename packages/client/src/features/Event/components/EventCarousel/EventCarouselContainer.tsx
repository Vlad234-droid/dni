import React, { FC, useMemo, useState } from 'react';

import useStore from 'hooks/useStore';
import { addDuration } from 'utils/date';
import { DEFAULT_FILTERS } from 'config/constants';

import { getPayloadWhere } from '../../utils';
import useFetchEvents from '../../hooks/useFetchEvents';
import EventCarousel from './EventCarousel';

const MAX_VISIBLE_ITEMS = 5;

const EventCarouselContainer: FC = () => {
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

  return (
    <EventCarousel
      events={list!}
      participants={participants}
      loading={loading}
      error={errorMessage}
    />
  );
};

export default EventCarouselContainer;
