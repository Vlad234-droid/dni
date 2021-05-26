import styled from 'styled-components';

import Media from 'styles/media';

export const FiltersContainer = styled.div`
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
