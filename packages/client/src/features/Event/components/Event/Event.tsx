import React, { FC, useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import ResponsiveImage from '@beans/responsive-image';

import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import { PostList } from 'features/Post';
import { useImageWrapper } from 'context';
import { normalizeImage } from 'utils/content';
import ButtonFilter from 'features/ButtonFilter';

import EventHeader from '../EventHeader';
import { Wrapper, Content, LeftContent, Filters } from './styled';
import { byIdSelector, getOne } from '../../store';
import { isEventOnAir } from '../../utils';

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

// TODO: fix data for network and type
const Event: FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const event = useSelector(byIdSelector(id));
  const { description, title, image, maxParticipants, startDate } = event || {};
  const [filter, setFilter] = useState<Filter>(ALL);
  const { isLoading } = useStore((state) => state.networks);
  const imageWrapperEl = useImageWrapper();
  //@ts-ignore
  const isOnAir = useMemo(() => event && isEventOnAir(event), [event]);

  useEffect(() => {
    if (event) return;

    loadEvent(id);
  }, [event, id]);

  const loadEvent = (id: number) => dispatch(getOne({ id }));

  if (isLoading) return <div>Loading network data...</div>;

  if (!isLoading && !event)
    return <Content>{`There is no event with id ${id}`}</Content>;

  const normalizeImg = normalizeImage(image);

  // TODO: normaluize image before save to store
  return (
    <Wrapper data-testid={TEST_ID}>
      {imageWrapperEl &&
        createPortal(
          <ResponsiveImage
            key={id}
            //@ts-ignore
            alt={normalizeImg?.alternativeText}
            //@ts-ignore
            src={normalizeImg?.url}
            fallbackSizeRatio='57%'
            objectFit='cover'
          />,
          //@ts-ignore
          imageWrapperEl,
        )}
      <EventHeader
        id={id}
        //@ts-ignore
        title={title}
        description={description}
        //@ts-ignore
        participants={maxParticipants}
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
