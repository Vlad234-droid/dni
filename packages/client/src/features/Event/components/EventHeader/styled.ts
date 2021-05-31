import styled from 'styled-components';

import Media from 'styles/media';
import { textXS } from 'styles';

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
  margin-right: 32px;
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

export const ButtonWrapper = styled.div`
  position: fixed;
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

export const TitleWrapper = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;

  h5 {
    font-weight: bold;
    font-size: 32px;
    line-height: 45px;
    margin-right: 0;
    padding: 22px 0;

    ${Media.tablet`
      padding: 0;
      margin-right: 24px;
      font-size: 50px;
      line-height: 71px;
    `}

    &::after {
      content: '.';
      color: ${({ theme }) => theme.colors.tescoRed};
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
