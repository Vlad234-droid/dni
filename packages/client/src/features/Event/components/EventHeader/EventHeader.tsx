import React, { FC } from 'react';
import { TitleWithEllipsis } from '@beans/title-link';
import Button from '@beans/button';
import Icon from '@beans/icon';

import { StatusLabel, StatusType } from 'features/Common';
import { useMedia } from 'context/InterfaceContext';
import { FULL_FORMAT, isoDateToFormat } from 'utils/date';

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
  const { id, title, description, maxParticipants, startDate } = event;
  const { isMobile } = useMedia();
  const isOnAir = isEventOnAir(event);

  return (
    <Wrapper>
      <Inner>
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
        <Actions>
          {!isMobile && (
            <Button variant='link'>
              <Icon graphic='link' />
            </Button>
          )}
          <ButtonWrapper>
            <EventAction
              id={id}
              disabled={
                Boolean(maxParticipants) && participants >= maxParticipants!
              }
            />
          </ButtonWrapper>
        </Actions>
      </Inner>
      <Description>
        <TextIconWrapper>
          <Icon graphic='datePicker' />
          {isoDateToFormat(startDate, FULL_FORMAT)}
        </TextIconWrapper>
        <Inner>
          <TextIconWrapper>
            <Icon graphic='account' />
            {participants} are participating
            {isMobile && (
              <Button variant='link'>
                <Icon graphic='link' />
              </Button>
            )}
          </TextIconWrapper>
        </Inner>
        <p>{description}</p>
      </Description>
    </Wrapper>
  );
};

export default EventHeader;
