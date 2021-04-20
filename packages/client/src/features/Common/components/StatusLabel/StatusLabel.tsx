import React, { FC } from 'react';
import styled from 'styled-components';

import { headingXX } from 'styles';

enum StatusType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

type Props = {
  type: StatusType;
};

const Wrapper = styled.div<Props>`
  border-radius: 20px;
  padding: 5px 10px;
  background: ${({ theme, type }) => theme.colors[type]};
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

const StatusLabel: FC<Props> = ({ children, type }) => (
  <Wrapper type={type} data-testid='status-label'>
    <Content>{children}</Content>
  </Wrapper>
);

export { StatusType };

export default StatusLabel;
