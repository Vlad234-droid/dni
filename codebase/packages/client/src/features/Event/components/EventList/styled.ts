import styled from 'styled-components';

import Media from 'styles/media';

const Wrapper = styled.div`
  padding: 16px 0;

  ${Media.tablet`
    padding: 32px;
  `}
`;

export { Wrapper };
