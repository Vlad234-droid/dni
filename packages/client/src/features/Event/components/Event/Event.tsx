import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import ResponsiveImage from '@beans/responsive-image';

import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import { PostList } from 'features/Post';
import { useImageWrapper } from 'context';
import { normalizeImage } from 'utils/content';
import ButtonFilter from 'features/ButtonFilter';
import { Loading } from 'store/types';
import { EmptyContainer } from 'features/Common';

import EventHeader from '../EventHeader';
import { byIdSelector, getOne, getParticipants } from '../../store';

import { Wrapper, Content, LeftContent, Filters } from './styled';

const TEST_ID = 'event';

type Props = {
  id: number;
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
const Event: FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const event = useSelector(byIdSelector(id));
  const [, setFilter] = useState<Filter>(ALL);
  const { loading, participants } = useStore((state) => state.events);
  const imageWrapperEl = useImageWrapper();

  useEffect(() => {
    if (event) return;

    loadEvent(id);
  }, [event, id]);

  // TODO: @katia refactor to get participants for current event!!!
  // if other participants (not related change, the component will be updated too)
  useEffect(() => {
    dispatch(getParticipants());
  }, []);

  const loadEvent = (id: number) => dispatch(getOne({ id }));

  if (loading == Loading.IDLE) return null;

  if (loading === Loading.PENDING) {
    return (
      <Wrapper data-testid={TEST_ID}>
        <div>Loading events...</div>
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
    // TODO: normalize image before save to store
    const normalizeImg = normalizeImage(event.image);

    return (
      <Wrapper data-testid={TEST_ID}>
        {imageWrapperEl &&
          createPortal(
            <ResponsiveImage
              key={id}
              alt={normalizeImg?.alternativeText}
              src={normalizeImg?.url}
              fallbackSizeRatio='57%'
              objectFit='cover'
            />,
            imageWrapperEl,
          )}
        <EventHeader event={event} participants={participants[id]! || 0} />
        <Content>
          <LeftContent>
            <Filters>
              <ButtonFilter
                initialFilters={filters}
                onChange={(key) => setFilter(key as Filter)}
              />
            </Filters>
            <PostList entityId={id} filter={'BY_EVENT'} />
          </LeftContent>
        </Content>
      </Wrapper>
    );
  }

  return null;
};

export { TEST_ID };

export default Event;
