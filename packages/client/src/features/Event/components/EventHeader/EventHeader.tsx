import React, { FC } from 'react';
import { TitleWithEllipsis } from '@beans/title-link';
import Button from '@beans/button';
import Icon from '@beans/icon';

import { StatusLabel, StatusType } from 'features/Common';
import { useMedia } from 'context/InterfaceContext';
import { FULL_FORMAT, isoDateToFormat } from 'utils/date';

import EventAction from '../EventAction';

import {
  Wrapper,
  Heading,
  TitleWrapper,
  StatusWrapper,
  ButtonWrapper,
  EventDate,
  Participants,
  Actions,
  MaxParticipants,
} from './styled';

type Props = {
  id: number;
  title: string;
  description?: string | string[];
  isOnAir?: boolean;
  participants: number;
  maxParticipants?: number;
  startDate: string;
};

const EventHeader: FC<Props> = ({
  id,
  title,
  description,
  isOnAir = false,
  participants,
  maxParticipants,
  startDate,
}) => {
  const { isMobile } = useMedia();

  // TODO: use commented code to display event actions edit and archive
  return (
    <Wrapper>
      <Heading>
        <TitleWrapper>
          <TitleWithEllipsis
            maxLines={1}
            titleHeight={isMobile ? '28px' : '45px'}
          >
            {title}
          </TitleWithEllipsis>
          {isOnAir && (
            <StatusWrapper>
              <StatusLabel type={StatusType.SUCCESS}>On-Air</StatusLabel>
            </StatusWrapper>
          )}
        </TitleWrapper>
        <ButtonWrapper>
          <EventAction id={id} disabled={participants >= maxParticipants!} />
        </ButtonWrapper>
      </Heading>
      <>
        <EventDate>{isoDateToFormat(startDate, FULL_FORMAT)}</EventDate>
        <Participants>
          {participants} are participating
          <Actions>
            <Button variant='link'>
              <Icon graphic='link' />
            </Button>
          </Actions>
        </Participants>
        <MaxParticipants>{maxParticipants} max participants</MaxParticipants>
        <p>{description}</p>
      </>
    </Wrapper>
  );
};

export default EventHeader;
