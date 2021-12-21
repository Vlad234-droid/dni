import styled from 'styled-components';

import { redDotStyles } from 'styles';
import Media from 'styles/media';

export const Wrapper = styled.div`
  padding: 24px 16px;

  ${Media.tablet`
    display: flex;
    justify-content: space-between;
    padding: 24px;
  `}
`;

export const JoinButtonWrapper = styled.div`
  position: fixed;
  bottom: 112px;
  left: 16px;
  right: 16px;
  z-index: 100;
  margin-top: 16px;

  & > button {
    width: 100%;
  }

  ${Media.tablet`
     position: static;
     margin-top: 24px;
  `}
`;

export const ShareStoryBtnWrapper = styled.div`
  position: fixed;
  bottom: 64px;
  left: 16px;
  right: 16px;
  margin-top: 16px;
  z-index: 1000;

  ${Media.tablet`
    position: static;
    margin-top: 0;
  `}
`;

export const TitleWrapper = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0 0 22px;
  color: ${({ theme }) => theme.colors.tescoBlue};

  ${Media.tablet`
     padding: 0;
  `}

  h5 {
    font-weight: bold;
    font-size: 32px;
    line-height: 45px;
    margin-right: 0;

    ${Media.tablet`
      margin-right: 24px;
      font-size: 50px;
      line-height: 71px;
    `}

    &::after {
      ${redDotStyles};
    }
  }
`;

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  ${Media.tablet`
     flex-direction: row;
  `}

  a {
    margin-bottom: 16px;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CopyLinkWrapper = styled.div`
  margin-right: 16px;
`;
