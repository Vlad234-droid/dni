import React, { FC, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import ResponsiveImage from '@beans/responsive-image';

import { PostList, BY_EVENT } from 'features/Post';
import { useImageWrapper } from 'context';
import Loading from 'types/loading';
import { EmptyContainer, Spinner } from 'features/Common';

import Event from '../../config/types';
import EventHeader from '../EventHeader';
import { Wrapper, Content, LeftContent } from './styled';

const TEST_ID = 'event';

type Props = {
  id: number;
  loading: Loading;
  loadEvent: () => void;
  loadParticipants: () => void;
  event?: Event;
  participants: number;
};

const EventComponent: FC<Props> = ({
  id,
  event,
  loadEvent,
  loadParticipants,
  loading,
  participants,
}) => {
  // const [filter, setFilter] = useState<Filter>(ALL);
  const imageWrapperEl = useImageWrapper();
  const isLoading = useMemo(
    () => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED,
    [loading],
  );

  useEffect(() => {
    if (event) return;

    loadEvent();
  }, [event]);

  useEffect(() => {
    if (participants || participants === 0) return;

    loadParticipants();
  }, []);

  if (loading === Loading.FAILED) {
    return (
      <Wrapper data-testid={TEST_ID}>
        <div>Here some error</div>
      </Wrapper>
    );
  }

  if (!event && loading === Loading.SUCCEEDED) {
    return (
      <Wrapper data-testid={TEST_ID}>
        <EmptyContainer description={`There is no event with id ${id}`} />
      </Wrapper>
    );
  }

  return (
    <Wrapper data-testid={TEST_ID}>
      {!event && isLoading && <Spinner height='500px' />}
      {loading === Loading.SUCCEEDED && event && (
        <>
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
              <PostList entityId={id} filter={BY_EVENT} />
            </LeftContent>
          </Content>
        </>
      )}
    </Wrapper>
  );
};

export { TEST_ID };

export default EventComponent;
