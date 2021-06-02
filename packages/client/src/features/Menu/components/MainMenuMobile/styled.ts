import styled, { css } from 'styled-components';
import Link from '@beans/link';

import Media from 'styles/media';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 200;
`;

export const Heading = styled.div`
  padding: 12px 24px 43px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LinkWrapper = styled(Link)<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-top: 1px solid ${({ theme }) => theme.colors.lines.base};
  color: ${({ theme, active }) =>
    active ? theme.colors.white : theme.colors.link.base} !important;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  background-color: ${({ theme, active }) =>
    active ? theme.colors.tescoBlue : theme.colors.white};
  font-size: 18px;
  line-height: 26px;
  text-decoration: none;

  &:last-child {
    color: ${({ theme }) => theme.colors.tescoRed} !important;
  }
`;
