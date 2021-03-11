import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 8px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
  outline: none;
`;

export const Item = styled.div<{ active: boolean }>`
  height: 48px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: ${({ theme, active }) =>
      active ? theme.colors.tescoBlue : theme.colors.background.dark};
  }

  background: ${({ theme, active }) =>
    active ? theme.colors.tescoBlue : 'transparent'};
  color: ${({ theme, active }) =>
    active ? theme.colors.white : theme.colors.base};
`;
