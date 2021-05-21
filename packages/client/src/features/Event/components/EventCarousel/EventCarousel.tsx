import React, { FC, useMemo } from 'react';
import isEmpty from 'lodash.isempty';

import Carousel from 'features/Carousel';
import { LargeTile } from 'features/Tile';
import { EmptyContainer, Error, Spinner } from 'features/Common';
import { Page } from 'features/Page';
import Loading from 'types/loading';

import { isEventOnAir, isActionDisabled } from '../../utils';
import EventAction from '../EventAction';
import Event from '../../config/types';
import { Wrapper, ErrorWrapper } from './styled';

const CONTENT_HEIGHT = '483px';
const TEST_ID = 'events-carousel';

type Props = {
  events: Event[];
  loading: Loading;
  participants?: Record<number, number>;
  error?: string;
};

const EventCarousel: FC<Props> = ({ events, loading, participants, error }) => {
  const isLoading = useMemo(
    () => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED,
    [loading],
  );

  const memoizedContent = useMemo(() => {
    if (error)
      return (
        <ErrorWrapper>
          <Error errorData={{ title: error }} />
        </ErrorWrapper>
      );

    if (isLoading && isEmpty(events))
      return <Spinner height={CONTENT_HEIGHT} />;

    if (loading === Loading.SUCCEEDED && isEmpty(events))
      return <EmptyContainer description='You have no events' />;

    return (
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
    );
  }, [error, loading, events, participants]);

  return <Wrapper data-testid={TEST_ID}>{memoizedContent}</Wrapper>;
};

export default EventCarousel;
