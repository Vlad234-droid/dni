import styled from 'styled-components';

import Media from 'styles/media';

const ListContainer = styled.div`
  margin-top: 16px;
  & > div {
    // display: flex;
    // flex-flow: row wrap;
    width: 100%;
    height: 100%;
  }
`;

const Wrapper = styled.div`
  padding: 32px 16px 0;

  ${Media.desktop`
    padding: 32px;
  `}
`;

export { Wrapper, ListContainer };
