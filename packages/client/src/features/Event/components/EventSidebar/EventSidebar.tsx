import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@beans/button';
import slice from 'lodash.slice';
import isEmpty from 'lodash.isempty';

import { EmptyContainer } from 'features/Common';
import { LargeTile, SmallTile } from 'features/Tile';
import { FULL_FORMAT, isoDateToFormat } from 'utils/date';
import { Loading } from 'store/types';
import { EntityListPayload } from 'types/payload';
import { isEventOnAir } from '../../utils';
import Event from '../../config/types';
import EventAction from '../EventAction';

import { List, Title, Wrapper } from './styled';

const TEST_ID = 'events-sidebar';
const MAX_VISIBLE_ITEMS = 3;
export const FILTERS = {
  _start: 0,
  _limit: MAX_VISIBLE_ITEMS,
};

type Props = {
  events?: Event[];
  loading: Loading;
  loadEvents: (filters: EntityListPayload) => void;
};

const EventSidebar: FC<Props> = ({ events, loading, loadEvents }) => {
  // this component depends on time passing, how often should it be updated?
  useEffect(() => {
    if (!isEmpty(events)) return;

    loadEvents(FILTERS);
  }, [events]);

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

  // TODO: remove network data from event, keep only network id

  return (
    <Wrapper data-testid={TEST_ID}>
      <Title>Events</Title>
      <List>
        {slice(events, 0, MAX_VISIBLE_ITEMS).map((eventItem, index) => {
          const { id, title, maxParticipants, image, created_at } = eventItem;

          return !index ? (
            <LargeTile
              key={id}
              id={id}
              title={title}
              image={image}
              participants={maxParticipants}
              isOnAir={isEventOnAir(eventItem)}
              renderAction={() => <EventAction id={id} />}
              // TODO: dont like transformation here - its duplicated everywhere - and is created again and again in lists
              // TODO: transform before save to store
              meta={isoDateToFormat(created_at, FULL_FORMAT)}
              link='/events'
            />
          ) : (
            <SmallTile
              key={id}
              id={id}
              title={title}
              image={image}
              isOnAir={isEventOnAir(eventItem)}
              renderAction={() => <EventAction id={id} />}
              meta={isoDateToFormat(created_at, FULL_FORMAT)}
              link='/events'
            />
          );
        })}
      </List>
      <Link to={'/events'}>
        <Button variant='secondary'>All events</Button>
      </Link>
    </Wrapper>
  );
};

export { TEST_ID };

export default EventSidebar;
