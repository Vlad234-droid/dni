import styled from 'styled-components';

import Media from 'styles/media';

const Wrapper = styled.div`
  padding: 16px;

  ${Media.tablet`
    padding: 32px;
  `}
`;

const ListContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 16px;
`;

export { Wrapper, ListContainer };
