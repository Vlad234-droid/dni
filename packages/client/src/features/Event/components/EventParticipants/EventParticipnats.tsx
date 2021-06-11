import React, { FC } from 'react';
import styled from 'styled-components';
import Icon from '@beans/icon';

type Props = {
  participants?: number;
  maxParticipants?: number;
};

const EventParticipants: FC<Props> = ({
  participants = 0,
  maxParticipants,
}) => (
  <Wrapper>
    <Icon graphic='account' size={'sm'} />
    <Text>
      <span>{participants}</span>
      &nbsp;{maxParticipants && <span>{`/ ${maxParticipants}`}</span>}
      &nbsp;participants
    </Text>
  </Wrapper>
);

const Wrapper = styled.div`
  max-width: 100%;
  display: inline-flex;
  align-items: center;
`;

const Text = styled.span`
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
`;

export default EventParticipants;
