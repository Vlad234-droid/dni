import React, { FC } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';
import ICalendarLink from 'react-icalendar-link';

import { OnAir, CopyLink, TextWithEllipsis, RichTextRenderer } from 'features/Common';
import { useMedia } from 'context/InterfaceContext';
import useStore from 'hooks/useStore';

import EventAction from '../EventAction';
import Event from '../../config/types';
import { isEventOnAir, isActionDisabled, isPastEvent } from '../../utils';

import {
  Wrapper,
  TitleWrapper,
  StatusWrapper,
  ButtonWrapper,
  DownloadWrapper,
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
  const { id, title, description, maxParticipants, startDate, endDate, shortDescription } = event;
  const isJoined = events.includes(+id);
  const { isMobile, isLargeMobile } = useMedia();
  const isMobileView = isMobile || isLargeMobile;
  const isOnAir = isEventOnAir(startDate, endDate);
  const isPast = isPastEvent(endDate);
  const calendarDescription = shortDescription ? `${shortDescription} \\n\\n` : '';
  const placesLeft = maxParticipants && (maxParticipants - participants);

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
              filename={`${event.slug}-event.ics`}
              event={{
                title: event.title,
                description:
                  calendarDescription +
                  `For more details and the link to join the virtual event please check the event link: ` +
                  `${window.location.href}`,
                startTime: event.startDate.replace('at', ''),
                endTime: event.endDate.replace('at', ''),
                location: '',
              }}
            >
              <DownloadWrapper>
                <Button>
                  <Icon graphic='download' />
                </Button>
              </DownloadWrapper>
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
          {(isMobileView || maxParticipants) && (
            <TextIconWrapper>
              {maxParticipants && !isPast && (
                <>
                  <Icon graphic='account' />
                  <span>{placesLeft}&nbsp;{`place${placesLeft === 1 ? '' : 's'} left`}</span>
                </>
              )}
              {isMobileView && <CopyLink />}
            </TextIconWrapper>
          )}
        </Inner>
        {description && <RichTextRenderer source={description} />}
      </Description>
    </Wrapper>
  );
};

export default EventHeader;
