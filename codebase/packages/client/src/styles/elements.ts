import { css } from 'styled-components';

export const redDotStyles = css`
  content: '.';
  color: ${({ theme }) => theme.colors.tescoRed};
  font-weight: bold;
  font-family: system-ui;
`;
