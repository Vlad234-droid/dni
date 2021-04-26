import React, { FC, useEffect, useState } from 'react';
import isEmpty from 'lodash.isempty';

import Carousel from 'features/Carousel';
import { LargeTile } from 'features/Tile';

import useFetch from 'hooks/useFetch';
import { normalizeImage } from 'utils/content';
import { isoDateToFormat, FULL_FORMAT } from 'utils/date';
import Event from '../../config/types';
import { EmptyContainer } from 'features/Common';
import EventAction from '../EventAction';

const EventCarousel: FC = () => {
  const [{ response: list }, doFetch] = useFetch<Event[]>([]);

  const [filters] = useState({
    _start: 0,
    _limit: 5,
  });

  useEffect(() => {
    doFetch(
      (api) => api.events.fetchAll(filters),
      (res) => res,
    );
  }, [filters]);

  return isEmpty(list) ? (
    <EmptyContainer description='Nothing to show' />
  ) : (
    <Carousel itemWidth='278px' id='event-carousel'>
      {list!.map(({ id, title, maxParticipants, image, startDate }) => (
        <LargeTile
          key={`events-${id}`}
          id={id}
          title={title}
          participants={maxParticipants}
          link='/events'
          // TODO: make transformation when data loaded before saving to store
          meta={isoDateToFormat(startDate, FULL_FORMAT)}
          renderAction={(id) => <EventAction id={id} />}
          image={normalizeImage(image)}
        />
      ))}
    </Carousel>
  );
};

export default EventCarousel;
