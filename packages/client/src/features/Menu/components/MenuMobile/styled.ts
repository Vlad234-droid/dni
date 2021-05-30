import styled from 'styled-components';

export const Wrapper = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ItemsList = styled.div<{ amount: number }>`
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;

  & > * {
    flex: 0 0 ${({ amount }) => 100 / amount}%;
  }
`;
