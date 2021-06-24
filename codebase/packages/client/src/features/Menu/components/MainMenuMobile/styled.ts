import styled from 'styled-components';
import Link from '@beans/link';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 200;
  max-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
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
  border-top: 1px solid ${({ theme }) => theme.colors.lines.base};
  color: ${({ theme, active }) => (active ? theme.colors.white : theme.colors.link.base)} !important;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  background-color: ${({ theme, active }) => (active ? theme.colors.tescoBlue : theme.colors.white)};
  font-size: 18px;
  line-height: 60px;
  text-decoration: none;

  &:nth-last-child(2) {
    color: ${({ theme }) => theme.colors.tescoRed} !important;
    margin-bottom: 50px;
  }

  &:last-child {
    margin-top: auto;
    width: 100%;
    text-align: center;
  }
`;
