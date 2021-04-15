import React, { FC, useEffect, useCallback, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import ResponsiveImage from '@beans/responsive-image';

import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import Post from 'features/Post';
import { useImageWrapper } from 'context';
import { normalizeImage } from 'utils/content';
import ButtonFilter from 'features/ButtonFilter';

import EventHeader from '../EventHeader';
import { Wrapper, Content, LeftContent, Filters } from './styled';
import { byIdSelector, getOne } from '../../store';
import { isEventOnAir } from '../../utils';

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
  const { description, title, image, maxParticipants, startedAt } = event || {};
  const [isJoined, setIsJoined] = useState(false);
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

  const handleJoin = useCallback(() => {
    setIsJoined(true);
  }, []);

  const handleLeave = useCallback(() => {
    setIsJoined(false);
  }, []);

  if (!event && !isLoading)
    return <Content>{`There is no event with id ${id}`}</Content>;

  if (isLoading) return <div>Loading network data...</div>;

  // TODO: normaluize image before save to store
  return (
    <Wrapper>
      {imageWrapperEl &&
        createPortal(
          <ResponsiveImage
            key={id}
            //@ts-ignore
            alt={normalizeImage(image).alternativeText}
            //@ts-ignore
            src={normalizeImage(image).url}
            fallbackSizeRatio='57%'
            objectFit='cover'
          />,
          //@ts-ignore
          imageWrapperEl,
        )}
      <EventHeader
        //@ts-ignore
        title={title}
        isJoined={isJoined}
        onLeave={handleLeave}
        onJoin={handleJoin}
        description={description}
        //@ts-ignore
        participants={maxParticipants}
        //@ts-ignore
        isOnAir={isOnAir}
        //@ts-ignore
        startedAt={startedAt}
      />
      <Content>
        <LeftContent>
          <Filters>
            <ButtonFilter
              initialFilters={filters}
              onChange={(key) => setFilter(key as Filter)}
            />
          </Filters>
          <Post />
        </LeftContent>
      </Content>
    </Wrapper>
  );
};

export default Event;
