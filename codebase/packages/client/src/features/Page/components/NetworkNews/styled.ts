import styled from 'styled-components';

import Media from 'styles/media';

export const Container = styled.div`
  height: calc(100vh - 72px);
  display: grid;
  grid-template-columns: 100% auto;
  grid-template-rows: auto;
  grid-template-areas: 'left right';

  // ${Media.small_desktop`
  //   grid-template-columns: calc(100% - 200px) 200px;
  // `}

  ${Media.desktop`
    grid-template-columns: calc(100% - 334px) 334px;
  `}
`;

export const Left = styled.div`
  grid-area: left;
  padding-bottom: 56px;

  ${Media.small_desktop`
    padding-right: 16px;
  `}

  ${Media.desktop`
    padding-right: 40px;
  `}
`;

export const Right = styled.aside`
  grid-area: right;
  display: none;

  ${Media.desktop`
    display: block;
    position: relative;
  `}
`;