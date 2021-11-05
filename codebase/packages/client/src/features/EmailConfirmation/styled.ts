import styled from 'styled-components';

import Media from 'styles/media';

export const Wrapper = styled.div`
  position: relative;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding: 24px 16px 0;

  ${Media.tablet`
    padding: 32px 40px 0 32px;
    flex-direction: row;
  `}
`;
