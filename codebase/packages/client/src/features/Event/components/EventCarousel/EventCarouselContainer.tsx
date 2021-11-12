import React, { FC, useMemo, useState } from 'react';

import useStore from 'hooks/useStore';
import { addDuration } from 'utils/date';
import { DEFAULT_FILTERS } from 'config/constants';
import useDispatch from 'hooks/useDispatch';

import { getPayloadWhere } from '../../utils';
import useFetchEvents from '../../hooks/useFetchEvents';
import EventCarousel from './EventCarousel';
import { getParticipants } from '../../store';

const EventCarouselContainer: FC = () => {
  const dispatch = useDispatch();
  const { participants } = useStore((state) => state.events);
  const { networks } = useStore((state) => state.auth.user);
  const { eventError } = useStore(state => state.auth);

  const [filters] = useState({
    ...getPayloadWhere(networks),
    ...DEFAULT_FILTERS,
    endDate_gte: new Date(),
    startDate_lte: addDuration({ weeks: 2 }),
  });

  const [loading, list, hasMore, listError, countError] = useFetchEvents(filters);
  const errorMessage = useMemo(
    () => listError || countError || participants.error || eventError,
    [participants, listError, countError, eventError],
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
