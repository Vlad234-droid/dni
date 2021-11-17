import React, { FC } from 'react';
import styled from 'styled-components';
import Icon from '@beans/icon';

type Props = {
  participants?: number;
};

const Participants: FC<Props> = ({ participants = 0 }) => (
  <Wrapper>
    <Icon graphic='account' size={'sm'} />
    <Text>
      <span>{participants}</span>
      &nbsp;<span>{`participant${participants === 1 ? '' : 's'}`}</span>
    </Text>
  </Wrapper>
);

const Wrapper = styled.div<{ styles?: string }>`
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

export default Participants;
