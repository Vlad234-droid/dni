import styled from 'styled-components';

export const Wrapper = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ItemsList = styled.div<{ amount: number }>`
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;

  & > * {
    flex: 0 0 ${({ amount }) => 100 / (amount + 1)}%;
  }
`;
