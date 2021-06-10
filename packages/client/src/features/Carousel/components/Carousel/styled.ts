import styled from 'styled-components';

import { GREY_COLOR } from 'styles';
import Media from 'styles/media';

const Wrapper = styled.div`
  ${Media.small_desktop`
    padding-top: 32px;
  `}

  & .beans-carousel__scrollbar-mask {
    ${Media.small_desktop`
      padding: 0 16px;
    `}
  }

  & .beans-carousel__item {
    &:not(:last-child) {
      padding-right: 8px;
    }

    &:not(:first-child) {
      padding-left: 8px;
    }
  }

  & .beans-carousel__item:not(:first-child) {
    padding-left: 8px;
  }

  & .beans-carousel__controls-container {
    background-color: ${GREY_COLOR};
    margin-top: -1px;
    border-right: ${({ theme }) => `1px solid ${theme.colors.lines.base}`};
    border-left: ${({ theme }) => `1px solid ${theme.colors.lines.base}`};

    ${Media.small_desktop`
       border-right: none;
       border-left: none;
    `}
  }
`;

export { Wrapper };
