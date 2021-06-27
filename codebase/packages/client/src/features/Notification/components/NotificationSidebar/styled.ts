import styled from 'styled-components';

import {
  TOP_HEADER_HEIGHT,
  MAIN_HEADER_HEIGHT,
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
  FOOTER_HEIGHT,
} from 'features/Layout';
import Media from 'styles/media';

export const Wrapper = styled.div`
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
  overflow: hidden;

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
