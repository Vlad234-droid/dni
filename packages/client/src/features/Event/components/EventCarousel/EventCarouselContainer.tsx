import React, { FC, useState } from 'react';

import useStore from 'hooks/useStore';
import { addDuration } from 'utils/date';

import EventCarousel from './EventCarousel';
import useFetchEvents from '../../hooks/useFetchEvents';

const MAX_VISIBLE_ITEMS = 5;

const EventCarouselContainer: FC = () => {
  const { participants } = useStore((state) => state.events);
  const { networks = [] } = useStore((state) => state.auth.user);

  const [filters] = useState({
    _start: 0,
    _limit: MAX_VISIBLE_ITEMS,
    _sort: 'startDate:ASC',
    endDate_gte: new Date(),
    startDate_lte: addDuration({ weeks: 2 }),
    network_in: [...networks, -1],
  });

  const [loading, list] = useFetchEvents(filters);

  return (
    <EventCarousel
      events={list!}
      participants={participants}
      loading={loading}
    />
  );
};

export default EventCarouselContainer;
