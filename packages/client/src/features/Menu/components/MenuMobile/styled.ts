import styled from 'styled-components';

import Media from 'styles/media';

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
  font-size: 12px;
  line-height: 14px;
  padding: 6px 4px;
  text-align: center;
`;

export const IconWrapper = styled.div`
  //width: 24px;
  //height: 24px;
  overflow: hidden;
  position: relative;
  margin: 0 auto 4px;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

// export const IconDefault = styled.img`
//   opacity: 1;
// `;
//
// export const IconActive = styled.img`
//   position: absolute;
//   left: 0;
//   opacity: 0;
// `;
