import React, { FC } from 'react';
import styled from 'styled-components';
import Icon from '@beans/icon';

type Props = {
  participants?: number;
  maxParticipants?: number;
};

const Participants: FC<Props> = ({ participants = 0, maxParticipants }) => {
  const placesLeft = maxParticipants && (maxParticipants - participants);

  return (
    <Wrapper>
      {maxParticipants && (
        <>
          <Icon graphic='account' size={'sm'} />
          <Text>
            <span>{placesLeft}</span>
            &nbsp;<span>{`place${placesLeft === 1 ? '' : 's'} left`}</span>
          </Text>
        </>
      )}
    </Wrapper>
  )
};

const Wrapper = styled.div<{ styles?: string }>`
  max-width: 100%;
  min-height: 22px;
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

export default Participants;
