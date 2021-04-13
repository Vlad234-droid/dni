import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@beans/button';
import slice from 'lodash.slice';
import isEmpty from 'lodash.isempty';

import { StatusLabel, StatusType } from 'features/Common';
import { LargeTile, SmallTile } from 'features/Tile';
import useDispatch from 'hooks/useDispatch';
import { FULL_FORMAT, isoDateToFormat } from 'utils/date';

import { isEventOnAir } from '../../utils';
import {
  getList as getEvents,
  listSelector as eventsSelector,
} from '../../store';
import { Wrapper, Title, List } from './styled';

const MAX_VISIBLE_ITEMS = 3;

const EventSidebar: FC = () => {
  const dispatch = useDispatch();
  const events = useSelector(eventsSelector);
  // TODO: set sorting to get first by startDate - even default
  const [filters] = useState({ _start: 0, _limit: 3 });

  // how often make requests?
  // this component depends on time passing, how often should it be updated?
  useEffect(() => {
    if (!isEmpty(events)) return;

    loadEvents(filters);
  }, [filters, events]);

  const loadEvents = useCallback((filters) => {
    dispatch(getEvents(filters));
  }, []);

  return (
    <Wrapper data-testid='events-sidebar'>
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
              renderAction={() => (
                <Button variant='primary' onClick={() => console.log('test')}>
                  Take part
                </Button>
              )}
              renderStatus={() => (
                <StatusLabel type={StatusType.SUCCESS}>On Air</StatusLabel>
              )}
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
              renderAction={() => (
                <Button variant='primary' onClick={() => console.log('test')}>
                  Take part
                </Button>
              )}
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

export default EventSidebar;
