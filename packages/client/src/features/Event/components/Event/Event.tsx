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
import { getEventParticipants } from 'features/Auth/store';

import EventHeader from '../EventHeader';
import { byIdSelector, getOne } from '../../store';

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

// TODO: filter events by all and archived
// TODO: Pass events to PostList
const Event: FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const event = useSelector(byIdSelector(id));
  const { description, title, image, maxParticipants, startDate } = event || {};
  const [, setFilter] = useState<Filter>(ALL);
  const { loading } = useStore((state) => state.events);
  const { events: eventParticipants } = useStore(
    (state) => state.auth.participants,
  );
  const imageWrapperEl = useImageWrapper();
  const isOnAir = true;

  useEffect(() => {
    if (event) return;

    loadEvent(id);
  }, [event, id]);

  useEffect(() => {
    dispatch(getEventParticipants());
  }, []);

  const loadEvent = (id: number) => dispatch(getOne({ id }));

  if (loading === 'pending') return <div>Loading network data...</div>;

  if (loading === 'succeeded' && !event)
    return <Content>{`There is no event with id ${id}`}</Content>;

  const normalizeImg = normalizeImage(image);

  // TODO: normalize image before save to store
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
      <EventHeader
        id={id}
        //@ts-ignore
        title={title}
        description={description}
        //@ts-ignore
        participants={eventParticipants[id]! || 0}
        maxParticipants={maxParticipants}
        //@ts-ignore
        isOnAir={isOnAir}
        //@ts-ignore
        startDate={startDate}
      />
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
};

export { TEST_ID };

export default Event;
