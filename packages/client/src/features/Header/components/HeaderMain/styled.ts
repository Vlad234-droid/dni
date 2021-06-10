import styled from 'styled-components';

import { redDotStyles } from 'styles';

export const Logo = styled.div`
  margin-left: 12px;
  margin-bottom: 25px;
  color: ${({ theme }) => theme.colors.tescoBlue};
  font-size: 28px;
  line-height: 40px;
  font-weight: bold;

  &::after {
    ${redDotStyles};
  }
`;

export const Wrapper = styled.div`
  padding-top: 18px;
`;
