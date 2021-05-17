import React, { FC, useMemo } from 'react';
import isEmpty from 'lodash.isempty';

import Carousel from 'features/Carousel';
import { LargeTile } from 'features/Tile';
import { EmptyContainer, Spinner } from 'features/Common';
import { Page } from 'features/Page';
import Loading from 'types/loading';

import { isEventOnAir, isActionDisabled } from '../../utils';
import EventAction from '../EventAction';
import Event from '../../config/types';
import { Wrapper } from './styled';

const CONTENT_HEIGHT = '483px';
const TEST_ID = 'events-carousel';

type Props = {
  events: Event[];
  loading: Loading;
  participants?: Record<number, number>;
};

const EventCarousel: FC<Props> = ({ events, loading, participants }) => {
  const isLoading = useMemo(
    () => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED,
    [loading],
  );

  return (
    <Wrapper data-testid={TEST_ID}>
      {isLoading && <Spinner height={CONTENT_HEIGHT} />}
      {loading === Loading.SUCCEEDED && isEmpty(events) ? (
        <EmptyContainer description='You have no events' />
      ) : (
        <Carousel itemWidth='278px' id='event-carousel'>
          {events.map(
            ({ id, title, maxParticipants, image, startDate, endDate }) => (
              <LargeTile
                key={id}
                id={id}
                title={title}
                participants={participants![id] || 0}
                maxParticipants={maxParticipants}
                link={Page.EVENTS}
                meta={startDate}
                isOnAir={isEventOnAir(startDate, endDate)}
                wrapperHeight={CONTENT_HEIGHT}
                renderAction={() => (
                  <EventAction
                    id={id}
                    disabled={isActionDisabled(
                      participants![id],
                      maxParticipants,
                    )}
                  />
                )}
                image={image}
              />
            ),
          )}
        </Carousel>
      )}
    </Wrapper>
  );
};

export default EventCarousel;
