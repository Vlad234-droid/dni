import styled, { css } from 'styled-components';

import Media from 'styles/media';
import { redDotStyles } from 'styles';
import { HEADER_HEIGHT_MOBILE, HEADER_HEIGHT_DESKTOP } from 'features/Layout';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 100%;
  padding: 0 16px;

  ${Media.small_desktop`
    padding: 0;
  `}
`;

export const MainWrapper = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${Media.small_desktop`
    height: 100%;
  `}
`;

export const Icons = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  max-width: 100px;

  ${Media.small_desktop`
      width: 40px;
      height: 40px;
      justify-content: flex-end;
  `}
`;

export const IconWrapper = styled.div`
  height: 16px;
  cursor: pointer;

  ${Media.small_desktop`
      height: 40px;
  `}

  .beans-link__anchor {
    width: 16px;
    height: 16px;

    ${Media.small_desktop`
      width: 40px;
      height: 40px;
    `}
  }

  &:not(:first-child) {
    padding-left: 12px;
  }

  &:not(:last-child) {
    ${({ theme }) => css`
      ${Media.small_desktop`
        border-right: 1px solid ${theme.colors.lines.base};
        padding-right: 12px;
    `}
    `}
  }
`;

export const ToasterWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: ${HEADER_HEIGHT_MOBILE};
  left: 0;
  z-index: 2000;

  ${Media.small_desktop`
     top: ${HEADER_HEIGHT_DESKTOP};
  `}
`;

export const MenuWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;
`;

export const Title = styled.div`
  margin-right: 32px;
  color: ${({ theme }) => theme.colors.tescoBlue};
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;

  &::after {
    ${redDotStyles};
  }
`;

export const Aside = styled.div`
  display: flex;
`;

export const ShareStoryBtnWrapper = styled.div`
  position: fixed;
  bottom: 64px;
  left: 16px;
  right: 16px;
  z-index: 100;
  margin-top: 16px;

  ${Media.tablet`
    position: static;
    margin-top: 0;
  `}
`;
