import styled, { css } from 'styled-components';

import {
  TOP_HEADER_HEIGHT,
  MAIN_HEADER_HEIGHT,
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
  FOOTER_HEIGHT,
} from 'features/Layout';
import Media from 'styles/media';

export const Wrapper = styled.div<{ visible: boolean }>`
  padding: 24px;
  box-sizing: border-box;
  position: fixed;
  right: 0;
  top: ${HEADER_HEIGHT_MOBILE};
  bottom: ${FOOTER_HEIGHT};
  width: 100%;
  max-width: 408px;
  border-left: 1px solid ${({ theme }) => theme.colors.lines.base};
  background-color: ${({ theme }) => theme.colors.white};
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
  transform: translate3d(100%, 0px, 0px);
  visibility: visible;
  transition: all 0.5s ease 0s;

  ${({ visible }) =>
    visible &&
    css`
      transform: translate3d(0px, 0px, 0px);
      visibility: visible;
    `}

  ${Media.small_desktop`
    top: calc(${TOP_HEADER_HEIGHT} + ${MAIN_HEADER_HEIGHT} + ${HEADER_HEIGHT_DESKTOP});
    bottom: 0;
  `}
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const Title = styled.div`
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.heading};
`;
