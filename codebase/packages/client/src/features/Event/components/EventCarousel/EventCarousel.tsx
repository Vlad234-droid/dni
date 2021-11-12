import React, { FC, useEffect, useMemo } from 'react';
import isEmpty from 'lodash.isempty';

import Carousel from 'features/Carousel';
import { VerticalTile } from 'features/Tile';
import { EmptyContainer, Error, Spinner } from 'features/Common';
import { Page } from 'features/Page';
import Loading from 'types/loading';
import { useMedia } from 'context/InterfaceContext';
import Participants from 'features/Participants';

import { isEventOnAir, isActionDisabled } from '../../utils';
import Event from '../../config/types';
import EventAction from '../EventAction';
import { Wrapper, ErrorWrapper } from './styled';

const CONTENT_HEIGHT = '483px';
const TEST_ID = 'events-carousel';

type Props = {
  events: Event[];
  loading: Loading;
  participants?: Record<number, number>;
  error?: string;
  loadParticipants: () => void;
  hasMore?: boolean;
};

const EventCarousel: FC<Props> = ({ events, loading, participants, error, loadParticipants }) => {
  const { isMobile } = useMedia();
  const isLoading = useMemo(() => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED, [loading]);

  useEffect(() => {
    loadParticipants();
  }, []);

  const memoizedContent = useMemo(() => {
    if (error)
      return (
        <ErrorWrapper>
          <Error errorData={{ title: error }}/>
        </ErrorWrapper>
      );

    if (isLoading && isEmpty(events)) return <Spinner height={CONTENT_HEIGHT} />;

    if (loading === Loading.SUCCEEDED && isEmpty(events)) return <EmptyContainer description='Nothing to show' />;

    return (
      <Carousel itemWidth={isMobile ? '260px' : '266px'} id='event-carousel' itemName='event'>
        {events.map(({ id, title, maxParticipants, image, startDate, endDate }) => (
          <VerticalTile
            key={id}
            id={id}
            title={title}
            link={Page.EVENTS}
            isOnAir={isEventOnAir(startDate, endDate)}
            renderAction={() => <EventAction id={id} disabled={isActionDisabled(participants![id], maxParticipants)} />}
            meta={startDate}
            renderParticipants={() => (
              <Participants maxParticipants={maxParticipants} participants={participants![id]} />
            )}
            image={image}
          />
        ))}
      </Carousel>
    );
  }, [error, loading, events, participants]);

  return <Wrapper data-testid={TEST_ID}>{memoizedContent}</Wrapper>;
};

export default EventCarousel;
