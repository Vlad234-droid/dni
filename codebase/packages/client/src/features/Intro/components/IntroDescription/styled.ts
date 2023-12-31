import styled, { css } from 'styled-components';

import Media from 'styles/media';
import { headingSM, textXS } from 'styles';

export const Title = styled.h3`
  margin: 0 0 16px;
  ${headingSM}

  ${Media.tablet`
     font-size: 24px;
     line-height: 28px;
  `}
`;

export const Wrapper = styled.div`
  ${Media.tablet`
    margin-right: 25px;
  `}
`;

export const Description = styled.p`
  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const Content = styled.div<{ isOpen: boolean }>`
  display: -webkit-box;
  -webkit-line-clamp: ${({ isOpen }) => (isOpen ? 'auto' : '5')};
  -webkit-box-orient: vertical;
  overflow: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  margin-bottom: 32px;
  ${textXS};

  ${Media.large_phone`
     margin-bottom: 62px;
  `}

  ${({ isOpen }) => css`
    ${Media.tablet`
      -webkit-line-clamp: ${isOpen ? 'auto' : '6'};
      margin-bottom: 40px;
      padding-right: 48px;
    `}
  `}

  p {
    margin-bottom: 16px;
    display: contents !important;
  }
`;
