import React, { FC, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from '@beans/button';
import isEmpty from 'lodash.isempty';

import { EmptyContainer, Spinner, Error } from 'features/Common';
import { LargeTile, SmallTile } from 'features/Tile';
import Loading from 'types/loading';
import { EntityListPayload } from 'types/payload';
import { Page } from 'features/Page';
import { DEFAULT_FILTERS } from 'config/constants';

import { isActionDisabled, isEventOnAir, getPayloadWhere } from '../../utils';
import Event from '../../config/types';
import EventAction from '../EventAction';
import { List, Title, Wrapper } from './styled';

const TEST_ID = 'events-sidebar';
const MAX_VISIBLE_ITEMS = 3;
export const FILTERS = {
  _start: 0,
  _limit: MAX_VISIBLE_ITEMS,
  endDate_gte: new Date(),
};

type Props = {
  events: Event[];
  loading: Loading;
  loadEvents: (filters: EntityListPayload) => void;
  handleClear: () => void;
  loadParticipants: () => void;
  participants?: Record<number, number>;
  networks?: number[];
  error?: string;
};

const EventSidebar: FC<Props> = ({
  events,
  loading,
  loadEvents,
  loadParticipants,
  participants,
  networks,
  handleClear,
  error,
}) => {
  const isLoading = useMemo(
    () => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED,
    [loading],
  );
  const filters = {
    ...getPayloadWhere(networks),
    ...FILTERS,
    ...DEFAULT_FILTERS,
  };

  console.log('filters', filters);

  useEffect(() => {
    handleClear();

    loadEvents(filters);
  }, [networks]);

  useEffect(() => {
    loadParticipants();
  }, []);

  const memoizedContent = useMemo(() => {
    if (error) return <Error errorData={{ title: error }} fullWidth />;

    if (isEmpty(events) && isLoading) return <Spinner height='500px' />;

    if (loading === Loading.SUCCEEDED && isEmpty(events))
      return <EmptyContainer description='You have no events' />;

    return (
      <>
        <List>
          {events.map((eventItem, index) => {
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
                meta={startDate}
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
                meta={startDate}
                link={Page.EVENTS}
                imageHeight='136px'
              />
            );
          })}
        </List>
        <Link to={Page.EVENTS}>
          <Button variant='secondary'>All events</Button>
        </Link>
      </>
    );
  }, [error, loading, events, participants]);

  return (
    <Wrapper data-testid={TEST_ID}>
      <Title>Events</Title>
      {memoizedContent}
    </Wrapper>
  );
};

export { TEST_ID };

export default EventSidebar;
