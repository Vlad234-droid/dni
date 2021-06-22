import React, { FC } from 'react';
import styled from 'styled-components';

import { GREEN_COLOR } from 'styles';

const Wrapper = styled.div<{
  small: boolean;
}>`
  display: flex;
  border-radius: 20px;
  padding: ${({ small }) => (small ? '4px' : '10px')};
  background: ${GREEN_COLOR};
`;

const Content = styled.span<{
  small: boolean;
}>`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ small }) => (small ? '10px' : '14px')};
  line-height: ${({ small }) => (small ? '12px' : '16px')};

  &::before {
    content: '';
    display: inline-block;
    width: ${({ small }) => (small ? '7px' : '10px')};
    height: ${({ small }) => (small ? '7px' : '10px')};
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.background.base};
    margin-right: ${({ small }) => (small ? '4px' : '8px')};
  }
`;

type Props = {
  small?: boolean;
};

const OnAir: FC<Props> = ({ small = false }) => (
  <Wrapper data-testid='on-air-label' small={small}>
    <Content small={small}>On-Air</Content>
  </Wrapper>
);

export default OnAir;
