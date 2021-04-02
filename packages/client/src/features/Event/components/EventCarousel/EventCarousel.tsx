import React, { FC, useEffect, useState } from 'react';
import Button from '@beans/button';

import Carousel from 'features/Carousel';
import { LargeTile } from 'features/Tile';

import useFetch from 'hooks/useFetch';
import { normalizeImage } from 'utils/content';
import { isoDateToFormat, FULL_FORMAT } from 'utils/date';
import { Event } from '../../store';

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

  return (
    <Carousel itemWidth='278px' id='event-carousel'>
      {list!.map(({ id, title, maxParticipants, image, created_at }) => (
        <LargeTile
          key={`events-${id}`}
          id={id}
          title={title}
          participants={maxParticipants}
          link='/events'
          // TODO: make transformation when data loaded before saving to store
          meta={isoDateToFormat(created_at, FULL_FORMAT)}
          renderAction={() => (
            <Button variant='primary' onClick={() => console.log('test')}>
              Take part
            </Button>
          )}
          image={normalizeImage(image)}
        />
      ))}
    </Carousel>
  );
};

export default EventCarousel;
