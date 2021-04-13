import styled from 'styled-components';

import Media from 'styles/media';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 24px;

  ${Media.tablet`
    align-items: flex-end;
    justify-content: flex-end;
    padding-left: 0;
  `}

  div:not(:last-child) {
    margin-bottom: 16px;
  }
`;
