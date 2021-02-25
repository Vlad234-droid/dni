import styled from 'styled-components';

import { headingXS, textXS } from 'styles';

export const Title = styled.h3`
  margin: 0 0 16px;
  ${headingXS}
`;

export const Wrapper = styled.div`
  margin-right: 25px;
`;

export const Content = styled.div<{ isOpen: boolean }>`
  --max-lines: 6;

  display: -webkit-box;
  max-width: 463px;
  -webkit-line-clamp: ${({ isOpen }) => (isOpen ? 'auto' : 'var(--max-lines)')};
  -webkit-box-orient: vertical;
  overflow: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  margin-bottom: 40px;
  ${textXS}
`;
