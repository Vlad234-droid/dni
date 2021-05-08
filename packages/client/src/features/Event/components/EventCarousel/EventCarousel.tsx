import React, { FC } from 'react';
import isEmpty from 'lodash.isempty';

import Carousel from 'features/Carousel';
import { LargeTile } from 'features/Tile';
import { EmptyContainer, Spinner } from 'features/Common';
import { Page } from 'features/Page';

import { isEventOnAir, isActionDisabled } from '../../utils';
import EventAction from '../EventAction';
import Event from '../../config/types';
import { Wrapper } from './styled';

const TEST_ID = 'events-carousel';

type Props = {
  events: Event[];
  isLoading: boolean;
  participants?: Record<number, number>;
};

// events are not loaded as they are loaded for EventsList and EventCarousel is only used there
const EventCarousel: FC<Props> = ({ events, isLoading, participants }) => {
  return isLoading ? (
    <Spinner height='300px' />
  ) : !isLoading && isEmpty(events) ? (
    <Wrapper data-testid={TEST_ID}>
      <EmptyContainer description='You have no events' />
    </Wrapper>
  ) : (
    <Wrapper data-testid={TEST_ID}>
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
    </Wrapper>
  );
};

export default EventCarousel;
