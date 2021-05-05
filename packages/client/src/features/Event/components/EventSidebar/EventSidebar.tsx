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
import { Page } from 'features/Page';
import { DEFAULT_FILTERS } from 'config/constants';

import { isActionDisabled, isEventOnAir } from '../../utils';
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
  loadCount: (filters: EntityListPayload) => void;
  loadParticipants: () => void;
  participants?: Record<number, number>;
  total: number;
  networks: number[];
};

const EventSidebar: FC<Props> = ({
  events,
  total,
  loading,
  loadEvents,
  loadCount,
  loadParticipants,
  participants,
  networks,
}) => {
  useEffect(() => {
    if (!isEmpty(events)) return;

    // TODO: move to avoid unnecessary reassignment
    const filters = {
      ...FILTERS,
      ...DEFAULT_FILTERS,
      network_in: [...networks, -1],
    };

    loadEvents(filters);
    loadCount(filters);
  }, [events, networks]);

  useEffect(() => {
    if (!isEmpty(participants)) return;

    loadParticipants();
  }, []);

  if (loading == Loading.IDLE) return null;

  if (loading === Loading.PENDING) {
    return (
      <Wrapper data-testid={TEST_ID}>
        <div>Loading events...</div>
      </Wrapper>
    );
  }

  // TODO: fix case loading is set faster than events actually loaded
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
      <Title>Events</Title>
      <List>
        {slice(events, 0, MAX_VISIBLE_ITEMS).map((eventItem, index) => {
          const {
            id,
            title,
            maxParticipants,
            image,
            startDate,
            endDate,
          } = eventItem;

          return !index ? (
            <LargeTile
              key={id}
              id={id}
              title={title}
              image={image}
              participants={participants![id] || 0}
              maxParticipants={maxParticipants}
              hideMaxParticipants={false}
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
              // TODO: dont like transformation here - its duplicated everywhere - and is created again and again in lists
              // TODO: transform before save to store
              meta={isoDateToFormat(startDate, FULL_FORMAT)}
              link={Page.EVENTS}
              imageHeight='unset'
            />
          ) : (
            <SmallTile
              key={id}
              id={id}
              title={title}
              image={image}
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
              meta={isoDateToFormat(startDate, FULL_FORMAT)}
              link={Page.EVENTS}
              imageHeight='136px'
            />
          );
        })}
      </List>
      {events &&
        (total > MAX_VISIBLE_ITEMS || events.length > MAX_VISIBLE_ITEMS) && (
          <Link to={Page.EVENTS}>
            <Button variant='secondary'>All events</Button>
          </Link>
        )}
    </Wrapper>
  );
};

export { TEST_ID };

export default EventSidebar;
