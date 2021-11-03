import styled from 'styled-components';

import Media from 'styles/media';
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
    font-weight: ${({ isOpen }) => isOpen ? 600 : 400};

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
`;

const Content = styled.div<{ mode: Mode, top: string }>`
  background: ${({ theme, mode }) => mode == Mode.LIGHT ? theme.colors.white : theme.colors.tescoBlue};
  width: 100vw;
  height: 60px;
  position: absolute;
  left: 0;
  top: ${({ top }) => top};
  z-index: 2000;
  border-top: 1px solid ${({ theme, mode }) => mode == Mode.LIGHT ? theme.colors.tescoBlue : theme.colors.white};

  ${Media.large_phone`
     height: 79px;
     position: fixed;
  `}

  a {
    font-weight: 600;
    color: ${({ theme, mode }) => mode == Mode.LIGHT ? theme.colors.tescoBlue : theme.colors.white};
    text-decoration: none;
    padding-bottom: 4px;
    border-bottom: 0 solid ${({ theme, mode }) => mode == Mode.LIGHT ? theme.colors.tescoBlue : theme.colors.white};
    
    &:hover, &:focus {
      color: ${({ theme, mode }) => mode == Mode.LIGHT ? theme.colors.tescoBlue : theme.colors.white};
      border-bottom: 1px solid ${({ theme, mode }) => mode == Mode.LIGHT ? theme.colors.tescoBlue : theme.colors.white};
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
  `}
`;

const LinkWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  text-align: center;

  ${Media.large_phone`
    width: 40%;
    text-align: left;
  `}

  ${Media.tablet`
    width: 27%;
  `}
`;

export { Wrapper, Content, ContentInner, LinkWrapper };