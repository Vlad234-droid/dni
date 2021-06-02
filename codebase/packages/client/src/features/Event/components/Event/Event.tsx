import React, { FC, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import ResponsiveImage from '@beans/responsive-image';

import { BY_EVENT, PostList } from 'features/Post';
import { useImageWrapper } from 'context';
import Loading from 'types/loading';
import { EmptyContainer, Error, Spinner } from 'features/Common';

import Event from '../../config/types';
import EventHeader from '../EventHeader';
import { Content, LeftContent, Wrapper } from './styled';

const TEST_ID = 'event';

type Props = {
  id: number;
  loading: Loading;
  loadEvent: () => void;
  loadParticipants: () => void;
  event?: Event;
  participants: number;
  error?: string;
  renderBreadcrumb: (eventTitle: string) => void;
};

const ERROR_TITLE = 'Request ID not found';
const ERROR_MESSAGE = 'We can not find the event ID you are looking for, please try again.';

const EventComponent: FC<Props> = ({
  id,
  event,
  loadEvent,
  loadParticipants,
  loading,
  participants,
  error,
  renderBreadcrumb,
}) => {
  const imageWrapperEl = useImageWrapper();
  const isLoading = useMemo(() => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED, [loading]);

  useEffect(() => {
    if (event) return;

    loadEvent();
  }, [event]);

  useEffect(() => {
    if (participants || participants === 0) return;

    loadParticipants();
  }, []);

  const memoizedContent = useMemo(() => {
    if (error) return <Error errorData={{ title: ERROR_TITLE, message: ERROR_MESSAGE }} />;

    if (!event && isLoading) return <Spinner height='500px' />;

    if (!event && loading === Loading.SUCCEEDED)
      return <EmptyContainer description={`There is no event with id ${id}`} />;

    return (
      <>
        {imageWrapperEl &&
          createPortal(
            <>
              {renderBreadcrumb(event!.title)}
              <ResponsiveImage
                key={event!.id}
                alt={event!.image?.alternativeText}
                src={event!.image?.url}
                fallbackSizeRatio='57%'
                objectFit='cover'
              />
            </>,
            imageWrapperEl,
          )}
        <EventHeader event={event!} participants={participants} />
        <Content>
          <LeftContent>
            <PostList entityId={id} filter={BY_EVENT} />
          </LeftContent>
        </Content>
      </>
    );
  }, [error, event, loading, participants]);

  return <Wrapper data-testid={TEST_ID}>{memoizedContent}</Wrapper>;
};

export { TEST_ID };

export default EventComponent;
