import styled, { css } from 'styled-components';

import Media from 'styles/media';
import { GREY_COLOR } from 'styles';

const swipeJsCss = css`
  .swipe {
    overflow: hidden;
  }

  .swipe-wrap {
    display: flex;
    flex-wrap: nowrap;
  }

  .swipe-item {
    position: relative;
    display: flex;
    align-items: stretch;
    > * {
      width: 100%;
    }
  }
`;

export const ActiveItemControlContainer = styled.div`
  width: 100%;
  background-color: ${GREY_COLOR};
  border: 1px solid ${({ theme }) => theme.colors.lines.base};
  border-top: none;
`;

export const SwipeWrapper = styled.div`
  position: relative;
  border: none;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  height: fit-content;
  ${swipeJsCss};
`;

export const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;

  ${Media.small_desktop`
     padding: 0 10px;
  `}

  .beans-carousel__controls-container {
    background-color: ${GREY_COLOR};
    border: 1px solid ${({ theme }) => theme.colors.lines.base};
    height: 56px;

    ${Media.tablet`
      margin: 0 -10px;
    `}
  }

  .beans-carousel__backward-control,
  .beans-carousel__forward-control {
    border: ${({ theme }) => `2px solid ${theme.colors.tescoBlue}`};
    width: 20px;
    height: 20px;
    box-sizing: content-box;

    &[disabled] {
      border: ${({ theme }) => `2px solid ${theme.colors.disabled.base}`};
    }

    svg {
      transform: scale(0.75);
    }

    path {
      stroke-width: 2;
    }
  }
`;
