import styled, { css } from 'styled-components';

import Media from 'styles/media';
import { 
  HEADER_HEIGHT_MOBILE, 
  HEADER_HEIGHT_TABLET, 
  // HEADER_HEIGHT_DESKTOP,
} from 'features/Layout';

import { Mode } from '../../types';

const Wrapper = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: 100%;

  ${Media.large_phone`
     width: auto;
     height: auto;
  `}

  button {
    position: relative;
    box-shadow: none;
    width: 100%;
    height: 100%;
    border-radius: unset;
    border: none;
    font-size: 18px;
    line-height: 60px;
    font-weight: ${({ isOpen }) => (isOpen ? 600 : 400)};

    ${Media.large_phone`
       line-height: 18px;
       font-weight: 600;
       font-size: 16px;
    `}

    &:hover, &:focus {
      text-decoration: none;
      box-shadow: none;
    }
  }

  svg {
    transition: transform 0.5s ease 0s;
    transform: ${({ isOpen }) => (isOpen ? 'rotate3d(0, 0, 1, 180deg)' : 'rotate3d(0, 0, 0, 180deg)')};
  }
`;

const Content = styled.div<{ mode: Mode; isOpen: boolean; isNextYear: boolean }>`
  background: ${({ theme, mode }) => (mode == Mode.LIGHT ? theme.colors.white : theme.colors.tescoBlue)};
  height: 62px;
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  border-top: 1px solid ${({ theme, mode }) => (mode == Mode.LIGHT ? theme.colors.tescoBlue : theme.colors.white)};
  transform: ${({ isOpen }) => (isOpen ? 'translate3d(0, 0, 0) scaleY(1)' : 'translate3d(0, -29px, 0) scaleY(0)')};
  transition: transform 0.5s ease 0s;
  z-index: 1001;

  ${({ isNextYear }) => css`
    ${Media.large_phone`
        top: ${isNextYear ? HEADER_HEIGHT_MOBILE : '78px'};
    `}
  `}

  ${() => css`
    ${Media.tablet`
        top: ${HEADER_HEIGHT_TABLET};
    `}
  `}

  ${Media.small_desktop`
    top: 36px;
  `}

  a {
    font-weight: 600;
    color: ${({ theme, mode }) => (mode == Mode.LIGHT ? theme.colors.tescoBlue : theme.colors.white)};
    text-decoration: none;
    padding-bottom: 4px;
    border-bottom: 0 solid ${({ theme, mode }) => (mode == Mode.LIGHT ? theme.colors.tescoBlue : theme.colors.white)};
    transition: visibility 0.1s ease 0s;
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};

    &:hover,
    &:focus,
    &:visited,
    &:visited:focus,
    &:visited:hover {
      color: ${({ theme, mode }) => (mode == Mode.LIGHT ? theme.colors.tescoBlue : theme.colors.white)};
      border-bottom: 1px solid
        ${({ theme, mode }) => (mode == Mode.LIGHT ? theme.colors.tescoBlue : theme.colors.white)};
    }
  }
`;

const ContentInner = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 90%;

  ${Media.large_phone`
    width: 80%;
  `}

  ${Media.tablet`
    width: 70%;
    margin: 0;
  `}
`;

const LinkWrapper = styled.div<{ inverse: boolean }>`
  margin: 0 auto;
  text-align: center;

  &:first-child {
    width: 40%;
  }

  &:last-child {
    width: 60%;
  }

  &:first-child,
  &:last-child {
    ${Media.large_phone`
      width: 40%;
      text-align: left;
    `}

    ${Media.tablet`
      width: 27%;
    `}
  }
`;

export { Wrapper, Content, ContentInner, LinkWrapper };
