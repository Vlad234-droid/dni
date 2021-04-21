import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@beans/button';
import slice from 'lodash.slice';
import isEmpty from 'lodash.isempty';

import { StatusLabel, StatusType, EmptyContainer } from 'features/Common';
import { LargeTile, SmallTile } from 'features/Tile';
import useDispatch from 'hooks/useDispatch';
import { FULL_FORMAT, isoDateToFormat } from 'utils/date';
import useStore from 'hooks/useStore';

import EventAction from '../EventAction';
import { isEventOnAir } from '../../utils';
import {
  getList as getEvents,
  listSelector as eventsSelector,
} from '../../store';
import { Wrapper, Title, List } from './styled';

const TEST_ID = 'events-sidebar';
const MAX_VISIBLE_ITEMS = 3;

const EventSidebar: FC = () => {
  const dispatch = useDispatch();
  const events = useSelector(eventsSelector);
  const { loading } = useStore((state) => state.events);
  const [filters] = useState({ _start: 0, _limit: 3 });

  // this component depends on time passing, how often should it be updated?
  useEffect(() => {
    if (!isEmpty(events)) return;

    loadEvents(filters);
  }, [filters, events]);

  const loadEvents = useCallback((filters) => {
    dispatch(getEvents(filters));
  }, []);

  if (loading == 'idle') return null;

  if (loading === 'succeeded' && isEmpty(events)) {
    return <EmptyContainer description='You have no events' />;
  }

  return (
    <Wrapper data-testid={TEST_ID}>
      <Title>Events</Title>
      {loading === 'pending' ? (
        <div>Loading events...</div>
      ) : (
        <>
          <List>
            {slice(events, 0, MAX_VISIBLE_ITEMS).map((eventItem, index) => {
              const {
                id,
                title,
                maxParticipants,
                image,
                created_at,
              } = eventItem;

              return !index ? (
                <LargeTile
                  key={id}
                  id={id}
                  title={title}
                  image={image}
                  participants={maxParticipants}
                  renderAction={() => <EventAction id={id} />}
                  renderStatus={() => (
                    <StatusLabel type={StatusType.SUCCESS}>On-Air</StatusLabel>
                  )}
                  // TODO: dont like transformation here - its duplicated everywhere - and is created again and again in lists
                  // TODO: transform before save to store
                  meta={isoDateToFormat(created_at, FULL_FORMAT)}
                  // TODO: event type is not Event
                  //@ts-ignore
                  isOnAir={isEventOnAir(eventItem)}
                  link='/events'
                />
              ) : (
                <SmallTile
                  key={id}
                  id={id}
                  title={title}
                  image={image}
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
        </>
      )}
    </Wrapper>
  );
};

export { TEST_ID };

export default EventSidebar;
