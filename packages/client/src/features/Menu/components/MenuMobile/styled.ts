import styled from 'styled-components';

export const Navigation = styled.nav`
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

export const Item = styled.div`
  padding: 8px 3px 0;
  text-align: center;
`;

export const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  margin: auto;
  overflow: hidden;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

export const IconDefault = styled.img`
  opacity: 1;
`;

export const IconActive = styled.img`
  position: absolute;
  left: 0;
  opacity: 0;
`;
