import styled from 'styled-components';

import Media from 'styles/media';

export const Container = styled.div`
  padding: 35px 16px 0;
  height: calc(100vh - 72px);
  display: grid;
  grid-template-columns: 100% auto;
  grid-template-rows: auto;
  grid-template-areas: 'left right';

  ${Media.tablet`
    padding: 32px 32px 0;
  `}

  ${Media.small_desktop`
    grid-template-columns: calc(100% - 320px) 320px;
    padding: 32px 0 0 16px;
  `}
  
  ${Media.desktop`
    grid-template-columns: calc(100% - 334px) 334px;
    padding: 32px 0 0 40px;
  `}
`;

export const Left = styled.div`
  grid-area: left;
  margin-bottom: 56px;

  ${Media.small_desktop`
    margin-right: 16px;
  `}

  ${Media.desktop`
    margin-right: 40px;
  `}
`;

export const Right = styled.aside`
  position: relative;
  grid-area: right;
`;
