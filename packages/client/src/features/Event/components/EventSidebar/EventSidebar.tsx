import React, { FC, useMemo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@beans/button';
import slice from 'lodash.slice';

import { StatusLabel, StatusType } from 'features/Common';
import { LargeTile, SmallTile } from 'features/Tile';
import useDispatch from 'hooks/useDispatch';
import { FULL_FORMAT, isoDateToFormat } from 'utils/date';

import { isEventOnAir } from '../../utils';
import {
  getList as getEvents,
  listSelector as eventsSelector,
} from '../../store';
import { Title, List } from './styled';

const MAX_VISIBLE_ITEMS = 3;

const EventSidebar: FC = () => {
  const dispatch = useDispatch();
  const events = useSelector(eventsSelector);
  // TODO: set sorting to get first by startDate - even default
  const [filters] = useState({ _start: 0, _limit: 3 });

  // how often make requests?
  // this component depends on time passing, how often should it be updated?
  useEffect(() => {
    // TODO: before load check whether events by current filters were not loaded
    loadEvents(filters);
  }, [filters]);

  // TODO: handle case when got an error during loading
  const loadEvents = useCallback((filters) => {
    dispatch(getEvents(filters));
  }, []);

  const memoizedRenderAction = useMemo(
    () => () => (
      <Button variant='primary' onClick={() => console.log('test')}>
        Take part
      </Button>
    ),
    [],
  );

  const memoizedRenderStatus = useMemo(
    () => () => <StatusLabel type={StatusType.SUCCESS}>On Air</StatusLabel>,
    [],
  );

  return (
    <div data-testid='events_sidebar'>
      <Title>Events</Title>
      <List>
        {slice(events, 0, MAX_VISIBLE_ITEMS).map((event, index) => {
          const { id, title, maxParticipants, image, created_at } = event;

          return !index ? (
            <LargeTile
              key={id}
              id={id}
              title={title}
              image={image}
              participants={maxParticipants}
              renderAction={memoizedRenderAction}
              renderStatus={memoizedRenderStatus}
              // TODO: dont like transformation here - its duplicated everywhere - and is created again and again in lists
              // TODO: transform before save to store
              meta={isoDateToFormat(created_at, FULL_FORMAT)}
              // TODO: event type is not Event
              //@ts-ignore
              isOnAir={isEventOnAir(event)}
              link='/events'
            />
          ) : (
            <SmallTile
              key={id}
              id={id}
              title={title}
              image={image}
              renderAction={memoizedRenderAction}
              meta={isoDateToFormat(created_at, FULL_FORMAT)}
              link='/events'
            />
          );
        })}
      </List>
      <Link to={'/events'}>
        <Button variant='secondary'>All events</Button>
      </Link>
    </div>
  );
};

export default EventSidebar;
