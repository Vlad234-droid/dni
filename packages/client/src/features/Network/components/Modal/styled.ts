import styled from 'styled-components';

import Media from 'styles/media';

export const Content = styled.div`
  font-size: 12px;
  line-height: 14px;
  margin-bottom: 16px;

  ${Media.tablet`
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 32px;
  `}

  ${Media.desktop`
    font-size: 16px;
    line-height: 20px;
  `}
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;

  button:not(last-child) {
    margin-right: 8px;
  }

  ${Media.tablet`
    margin-bottom: 24px;
  `}
`;
