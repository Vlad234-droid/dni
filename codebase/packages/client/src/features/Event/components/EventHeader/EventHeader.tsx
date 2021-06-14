import React, { FC } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';
import ICalendarLink from 'react-icalendar-link';

import { OnAir, CopyLink, TextWithEllipsis, RichTextRenderer } from 'features/Common';
import { useMedia } from 'context/InterfaceContext';

import EventAction from '../EventAction';
import Event from '../../config/types';
import { isEventOnAir, isActionDisabled } from '../../utils';

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
  console.log('description', description);
  const { isMobile, isLargeMobile } = useMedia();
  const isMobileView = isMobile || isLargeMobile;
  const isOnAir = isEventOnAir(startDate, endDate);

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
          {!isMobileView && <CopyLink />}
          <ButtonWrapper>
            <EventAction id={id} disabled={isActionDisabled(participants, maxParticipants)} />
          </ButtonWrapper>
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
            <Button>
              <Icon graphic='download' />
            </Button>
          </ICalendarLink>
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
              {participants} are participating. {maxParticipants && `${maxParticipants} is maximum capacity.`}
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
