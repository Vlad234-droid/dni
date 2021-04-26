import { FC, useEffect, useState } from 'react';
import isEmpty from 'lodash.isempty';

import Carousel from 'features/Carousel';
import { LargeTile } from 'features/Tile';
import useFetch from 'hooks/useFetch';
import { normalizeImage } from 'utils/content';
import { isoDateToFormat, FULL_FORMAT } from 'utils/date';
import { EmptyContainer } from 'features/Common';
import { Page } from 'features/Page';

import EventAction from '../EventAction';
import Event from '../../config/types';
import { Wrapper } from './styled';

const EventCarousel: FC = () => {
  const [{ response: list }, doFetch] = useFetch<Event[]>([]);

  const [filters] = useState({
    _start: 0,
    _limit: 5,
    _sort: 'startDate:ASC',
  });

  useEffect(() => {
    doFetch(
      (api) => api.events.fetchAll(filters),
      (res) => res,
    );
  }, [filters]);

  return (
    <Wrapper>
      {isEmpty(list) ? (
        <EmptyContainer description='Nothing to show' />
      ) : (
        <Carousel itemWidth='278px' id='event-carousel'>
          {list!.map(({ id, title, maxParticipants, image, startDate }) => (
            <LargeTile
              key={`events-${id}`}
              id={id}
              title={title}
              participants={maxParticipants}
              link={Page.EVENTS}
              // TODO: make transformation when data loaded before saving to store
              meta={isoDateToFormat(startDate, FULL_FORMAT)}
              renderAction={(id) => <EventAction id={id} />}
              image={normalizeImage(image)}
            />
          ))}
        </Carousel>
      )}
    </Wrapper>
  );
};

export default EventCarousel;
