import styled from 'styled-components';

import Media from 'styles/media';
import { headingMD } from 'styles';

export const Wrapper = styled.div`
  padding: 0 16px;

  ${Media.small_desktop`
    padding: 32px;
  `}
`;

export const Content = styled.div<{ visible: boolean }>`
  margin-top: 32px;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  ${Media.tablet`
    width: 50%;
    margin-top: 64px;
  `};
`;

export const Title = styled.h5`
  ${headingMD};

  ${Media.tablet`
    font-size: 28px;
    line-height: 1.2;
  `}
`;
