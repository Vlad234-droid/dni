import React, { FC, useMemo } from 'react';
import Icon from '@beans/icon';
import ICalendarLink from 'react-icalendar-link';

import { OnAir, CopyLink, TextWithEllipsis } from 'features/Common';
import { useMedia } from 'context/InterfaceContext';

import EventAction from '../EventAction';
import Event from '../../config/types';
import { isEventOnAir } from '../../utils';

import {
  Wrapper,
  TitleWrapper,
  StatusWrapper,
  ButtonWrapper,
  Inner,
  Description,
  TextIconWrapper,
  Actions,
} from './styled';

type Props = {
  event: Event;
  participants: number;
};

const EventHeader: FC<Props> = ({ event, participants }) => {
  const { id, title, description, maxParticipants, startDate, endDate } = event;
  const { isMobile } = useMedia();
  const isOnAir = isEventOnAir(startDate, endDate);

  const memoizedDisabledAction = useMemo(
    () => Boolean(maxParticipants) && participants >= maxParticipants!,
    [participants],
  );

  return (
    <Wrapper>
      <Inner>
        <TitleWrapper>
          <TextWithEllipsis>{title}</TextWithEllipsis>
          {isOnAir && (
            <StatusWrapper>
              <OnAir />
            </StatusWrapper>
          )}
        </TitleWrapper>
        <Actions>
          {!isMobile && <CopyLink />}
          <ButtonWrapper>
            <EventAction id={id} disabled={memoizedDisabledAction} />
          </ButtonWrapper>
        </Actions>
      </Inner>
      <Description>
        <TextIconWrapper>
          <ICalendarLink
            filename={`${event.title} event.ics`}
            event={{
              title: event.title,
              description: event.description,
              startTime: event.startDate.replace('at', ''),
              endTime: event.endDate.replace('at', ''),
              location: '',
            }}
          >
            <Icon graphic='datePicker' />
          </ICalendarLink>
          {startDate}
        </TextIconWrapper>
        <Inner>
          <TextIconWrapper>
            <Icon graphic='account' />
            <span>
              {participants} are participating.{' '}
              {maxParticipants && `${maxParticipants} is maximum capacity.`}
            </span>
            {isMobile && <CopyLink />}
          </TextIconWrapper>
        </Inner>
        <p>{description}</p>
      </Description>
    </Wrapper>
  );
};

export default EventHeader;
