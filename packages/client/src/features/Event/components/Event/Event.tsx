import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ResponsiveImage from '@beans/responsive-image';

import { PostList, BY_EVENT } from 'features/Post';
import { useImageWrapper } from 'context';
import ButtonFilter from 'features/ButtonFilter';
import { Loading } from 'store/types';
import { EmptyContainer, Spinner } from 'features/Common';

import Event from '../../config/types';
import EventHeader from '../EventHeader';

import { Wrapper, Content, LeftContent, Filters } from './styled';

const TEST_ID = 'event';

type Props = {
  id: number;
  loading: Loading;
  loadEvent: () => void;
  loadParticipants: () => void;
  event?: Event;
  participants: number;
};

const ALL = 'ALL';
const ARCHIVED = 'ARCHIVED';

const filters = [
  {
    key: ALL,
    title: 'All Posts',
    active: true,
  },
  {
    key: ARCHIVED,
    title: 'Archived',
    active: false,
  },
];

type Filter = typeof ALL | typeof ARCHIVED;

// TODO: @katia filter events by all and archived
// TODO: @katia Pass events to PostList
const EventComponent: FC<Props> = ({
  id,
  event,
  loadEvent,
  loadParticipants,
  loading,
  participants,
}) => {
  const [filter, setFilter] = useState<Filter>(ALL);
  const imageWrapperEl = useImageWrapper();

  useEffect(() => {
    if (event) return;

    loadEvent();
  }, [event]);

  // TODO: @katia refactor to get participants for current event!!!
  // if other participants (not related change, the component will be updated too)
  useEffect(() => {
    if (participants || participants === 0) return;

    loadParticipants();
  }, []);

  if (loading == Loading.IDLE) return null;

  if (loading === Loading.PENDING) {
    return (
      <Wrapper data-testid={TEST_ID}>
        <Spinner height='300px' />
      </Wrapper>
    );
  }

  if (loading === Loading.SUCCEEDED && !event) {
    return (
      <Wrapper data-testid={TEST_ID}>
        <EmptyContainer description={`There is no event with id ${id}`} />
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

  if (loading === Loading.SUCCEEDED && event) {
    return (
      <Wrapper data-testid={TEST_ID}>
        {imageWrapperEl &&
          createPortal(
            <ResponsiveImage
              key={event.id}
              alt={event.image?.alternativeText}
              src={event.image?.url}
              fallbackSizeRatio='57%'
              objectFit='cover'
            />,
            imageWrapperEl,
          )}
        <EventHeader event={event} participants={participants} />
        <Content>
          <LeftContent>
            <Filters>
              <ButtonFilter
                initialFilters={filters}
                onChange={(key) => setFilter(key as Filter)}
              />
            </Filters>
            <PostList
              entityId={id}
              filter={BY_EVENT}
              isArchived={filter === ARCHIVED}
            />
          </LeftContent>
        </Content>
      </Wrapper>
    );
  }

  return null;
};

export { TEST_ID };

export default EventComponent;
