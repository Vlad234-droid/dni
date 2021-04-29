import React, { FC } from 'react';
import styled from 'styled-components';

import { headingXX } from 'styles';
import Icon from '@beans/icon';

enum StatusType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

type Props = {
  type: StatusType;
  small?: boolean;
};

const Wrapper = styled.div<Props>`
  border-radius: ${({ small }) => (small ? 'none' : '20px')};
  padding: ${({ small }) => (small ? '0' : '5px 10px')};
  background: ${({ theme, type, small }) =>
    small ? 'transparent' : theme.colors[type]};

  circle {
    fill: ${({ theme, type }) => theme.colors[type]};
  }
`;

const Content = styled.span`
  color: ${({ theme }) => theme.colors.white};
  ${headingXX};

  &::before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.background.base};
    margin-right: 8px;
  }
`;

const StatusLabel: FC<Props> = ({ children, type, small = false }) => (
  <Wrapper type={type} small={small} data-testid='status-label'>
    {small ? <Icon graphic='indicator' /> : <Content>{children}</Content>}
  </Wrapper>
);

export { StatusType };

export default StatusLabel;
