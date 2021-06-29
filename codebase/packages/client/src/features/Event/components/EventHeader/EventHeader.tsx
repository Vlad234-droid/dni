import React, { FC } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';
import ICalendarLink from 'react-icalendar-link';

import { OnAir, CopyLink, TextWithEllipsis, RichTextRenderer } from 'features/Common';
import { useMedia } from 'context/InterfaceContext';
import useStore from 'hooks/useStore';
import { Page } from 'features/Page';

import EventAction from '../EventAction';
import Event from '../../config/types';
import { isEventOnAir, isActionDisabled, isPastEvent } from '../../utils';

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
  const { events = [] } = useStore((state) => state.auth.user);
  const { id, title, description, maxParticipants, startDate, endDate } = event;
  const isJoined = events.includes(+id);
  const { isMobile, isLargeMobile } = useMedia();
  const isMobileView = isMobile || isLargeMobile;
  const isOnAir = isEventOnAir(startDate, endDate);
  const isPast = isPastEvent(endDate);

  return (
    <Wrapper>
      <Inner>
        <TitleWrapper>
          <TextWithEllipsis tooltipPosition={{ left: '24px', top: '67px' }}>{title}</TextWithEllipsis>
          {isOnAir && (
            <StatusWrapper>
              <OnAir />
            </StatusWrapper>
          )}
        </TitleWrapper>
        <Actions>
          {!isMobileView && <CopyLink />}
          {!isPast && (
            <ButtonWrapper isJoined={isJoined}>
              <EventAction id={id} disabled={isActionDisabled(participants, maxParticipants)} />
            </ButtonWrapper>
          )}
          {!isPast && (
            <ICalendarLink
              filename={`${event.title} event.ics`}
              event={{
                title: event.title,
                description:
                  `For more details and the link to join the virtual event please check the event link below:
                  
                  ${window.location.origin}/${Page.EVENTS}/${id}
                `,
                startTime: event.startDate.replace('at', ''),
                endTime: event.endDate.replace('at', ''),
                location: '',
              }}
            >
              <Button>
                <Icon graphic='download' />
              </Button>
            </ICalendarLink>
          )}
        </Actions>
      </Inner>
      <Description>
        <TextIconWrapper>
          <Icon graphic='datePicker' />
          {startDate}
        </TextIconWrapper>
        <Inner>
          <TextIconWrapper>
            <Icon graphic='account' />
            <span>
              {participants} {participants === 1 ? 'is' : 'are'} participating.{' '}
              {maxParticipants && `${maxParticipants} is maximum capacity.`}
            </span>
            {isMobileView && <CopyLink />}
          </TextIconWrapper>
        </Inner>
        {description && <RichTextRenderer source={description} />}
      </Description>
    </Wrapper>
  );
};

export default EventHeader;
