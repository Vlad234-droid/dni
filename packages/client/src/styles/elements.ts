import { css } from 'styled-components';

export const redDot = css`
  content: '.';
  color: ${({ theme }) => theme.colors.tescoRed};
  font-weight: bold;
  font-family: system-ui;
`;
