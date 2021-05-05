import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import useStore from 'hooks/useStore';

import EventCarousel from './EventCarousel';
import { listSelector as eventsSelector } from '../../store';

const EventCarouselContainer: FC = () => {
  const events = useSelector(eventsSelector);
  const { participants, loading } = useStore((state) => state.events);

  return (
    <EventCarousel
      events={events}
      participants={participants}
      loading={loading}
    />
  );
};

export default EventCarouselContainer;
