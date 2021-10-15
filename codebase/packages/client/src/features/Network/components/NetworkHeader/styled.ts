import styled from 'styled-components';

import { redDotStyles, headingXS } from 'styles';
import Media from 'styles/media';

export const Wrapper = styled.div`
  padding: 24px 16px;
  
  ${Media.tablet`
    display: flex;
    justify-content: space-between;
    padding: 24px;
  `}
  
  .beans-modal__modal-container {
    max-width: 100vw;
  }
`;

export const LeaveButtonWrapper = styled.div<{ isJoined: boolean }>`
  position: ${({ isJoined }) => (isJoined ? 'static' : 'fixed')};
  bottom: 76px;
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

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${Media.tablet`
    padding: 16px;
  `}
`;

export const ModalTitle = styled.h3`
  width: 100%;
  text-align: left;
  margin-bottom: 16px;
  ${headingXS};

  ${Media.tablet`
    margin-bottom: 24px;
    font-size: 24px;
    line-height: 28px;
  `}
`;
