import styled from 'styled-components';

import { textXX } from 'styles';

export const Wrapper = styled.div<{ isActive: boolean }>`
  ${textXX};
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.tescoBlue : theme.colors.white};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.white : theme.colors.tescoBlue};
  cursor: pointer;

  & .beans-icon__svg {
    stroke: ${({ theme, isActive }) =>
      isActive ? theme.colors.white : theme.colors.tescoBlue};
  }
`;

export const Text = styled.div`
  margin-top: 3px;
`;
