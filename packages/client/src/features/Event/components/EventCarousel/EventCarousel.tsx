import React, { FC } from 'react';
import isEmpty from 'lodash.isempty';
import slice from 'lodash.slice';

import Carousel from 'features/Carousel';
import { LargeTile } from 'features/Tile';
import { normalizeImage } from 'utils/content';
import { isoDateToFormat, FULL_FORMAT } from 'utils/date';
import { EmptyContainer } from 'features/Common';
import { Page } from 'features/Page';
import { Loading } from 'store/types';

import { isEventOnAir, isActionDisabled } from '../../utils';
import EventAction from '../EventAction';
import Event from '../../config/types';
import { Wrapper } from './styled';

const TEST_ID = 'events-carousel';
const MAX_VISIBLE_ITEMS = 5;
export const FILTERS = {
  _start: 0,
  _limit: MAX_VISIBLE_ITEMS,
};

type Props = {
  events?: Event[];
  loading: Loading;
  participants?: Record<number, number>;
};

// events are not loaded as they are loaded for EventsList and EventCarousel is only used there
const EventCarousel: FC<Props> = ({ events, loading, participants }) => {
  if (loading == Loading.IDLE) return null;

  if (loading === Loading.PENDING) {
    return (
      <Wrapper data-testid={TEST_ID}>
        <div>Loading events...</div>
      </Wrapper>
    );
  }

  if (loading === Loading.SUCCEEDED && isEmpty(events)) {
    return (
      <Wrapper data-testid={TEST_ID}>
        <EmptyContainer description='You have no events' />
      </Wrapper>
    );
  }

  if (loading === Loading.FAILED) {
    return (
      <Wrapper data-testid={TEST_ID}>
        <div>Here some error</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper data-testid={TEST_ID}>
      <Carousel itemWidth='278px' id='event-carousel'>
        {slice(events, 0, MAX_VISIBLE_ITEMS).map(
          ({ id, title, maxParticipants, image, startDate, endDate }) => (
            <LargeTile
              key={id}
              id={id}
              title={title}
              participants={participants![id] || 0}
              maxParticipants={maxParticipants}
              link={Page.EVENTS}
              // TODO: make transformation when data loaded before saving to store
              meta={isoDateToFormat(startDate, FULL_FORMAT)}
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
              image={normalizeImage(image)}
            />
          ),
        )}
      </Carousel>
    </Wrapper>
  );
};

export default EventCarousel;
