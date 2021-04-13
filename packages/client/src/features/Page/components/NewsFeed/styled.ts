import styled from 'styled-components';

import Media from 'styles/media';

export const Container = styled.div`
  padding: 35px 16px 0;
  height: calc(100vh - 53px);
  display: grid;
  grid-template-columns: 1fr 320px;
  grid-template-rows: auto;
  grid-template-areas: 'left left';

  ${Media.small_desktop`
      padding: 32px 16px 0;
      grid-template-areas: 'left right';
  `}

  ${Media.desktop`
      padding: 32px 40px 0;
  `}
`;

export const Left = styled.div`
  grid-area: left;
`;

export const Right = styled.aside`
  grid-area: right;

  ${Media.tablet`
    margin-left: 32px;
  `}

  ${Media.small_desktop`
    margin-left: 16px;
  `}

  ${Media.desktop`
    margin-left: 40px;
  `}
`;
