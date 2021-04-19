import styled from 'styled-components';

import Media from 'styles/media';

export const Wrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-flow: row wrap;
  width: 100%;

  & > div {
    margin-bottom: 16px;
    width: 100%;

    ${Media.tablet`
      width: calc(100% / 3 - 8px);
      margin: 0 4px 24px;
    `}

    ${Media.small_desktop`
      width: calc(100% / 4 - 8px);
      margin: 0 4px 24px;
    `}
    
    ${Media.desktop`
      width: calc(100% / 5 - 8px);
    `}
  }
`;
