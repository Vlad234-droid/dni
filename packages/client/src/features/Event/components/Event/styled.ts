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

export const LeftContent = styled.div`
  flex-basis: 288px;
  flex-grow: 1;
  margin-bottom: 64px;

  ${Media.tablet`
     margin-bottom: 0;
  `}
`;

export const Filters = styled.div`
  margin-bottom: 16px;

  button {
    margin-right: 0 !important;

    &:first-child {
      border-radius: 24px 0 0 24px;
    }

    &:last-child {
      border-radius: 0 24px 24px 0;
    }

    &.secondary {
      border: ${({ theme }) => `1px solid ${theme.colors.lines.base}`};
    }
  }

  ${Media.tablet`
     margin-bottom: 32px;
  `}
`;
