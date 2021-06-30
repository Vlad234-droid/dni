import styled from 'styled-components';

import Media from 'styles/media';
import { textXS, redDotStyles } from 'styles';

export const Wrapper = styled.div`
  padding: 0 16px 24px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.lines.base}`};

  ${Media.tablet`
    padding: 0 24px;
  `}
`;

export const Inner = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StatusWrapper = styled.div`
  position: absolute;
  top: -100px;
  left: 10px;
  margin-right: 32px;

  ${Media.tablet`
     position: static;
  `}
`;

export const TextIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 16px;

    ${Media.tablet`
     margin-bottom: 24px;
  `}
  }

  ${Media.tablet`
     margin-bottom: 16px;
  `}

  svg {
    margin-right: 10px;
  }

  button {
    margin-left: 16px;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & button:not(:last-child) {
    margin-right: 16px;
  }
`;

export const ButtonWrapper = styled.div<{ isJoined: boolean }>`
  position: ${({ isJoined }) => (isJoined ? 'static' : 'fixed')};
  bottom: 76px;
  left: 16px;
  right: 16px;
  z-index: 100;

  & > button {
    width: 100%;
  }

  ${Media.tablet`
    position: static;
  `}
  
`;

export const DownloadWrapper = styled.div`
  margin-left: 16px;
`;

export const TitleWrapper = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;

  h5 {
    font-size: 32px;
    line-height: 45px;
    padding: 22px 0;
    color: ${({ theme }) => theme.colors.tescoBlue};

    ${Media.tablet`
      padding: 0;
      margin-right: 24px;
      font-size: 50px;
      line-height: 71px;
    `}

    &::after {
      ${redDotStyles};
    }
  }
`;

export const Description = styled.div`
  ${textXS};

  ${Media.tablet`
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 32px;
  `}
`;
