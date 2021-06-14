import styled from 'styled-components';

import { redDotStyles } from 'styles';

export const Logo = styled.div`
  padding: 16px 0;
  margin-left: 12px;
  color: ${({ theme }) => theme.colors.tescoBlue};
  font-size: 28px;
  line-height: 40px;
  font-weight: bold;

  &::after {
    ${redDotStyles};
  }
`;
