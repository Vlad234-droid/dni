import styled from 'styled-components';

import Media from 'styles/media';
import { headingMD, textSM } from 'styles';

export const Wrapper = styled.div`
  padding: 0 16px 24px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.lines.base}`};

  ${Media.tablet`
     padding: 0 24px 24px;
  `}
`;

export const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 17px;
`;

export const StatusWrapper = styled.div`
  margin-right: 33px;
`;

export const TextIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

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
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  ${Media.tablet`
    flex-direction: row;
  `}

  h3 {
    margin-right: 24px;
    margin-bottom: 4px;
    ${headingMD};

    ${Media.tablet`
      font-size: 32px;
      line-height: 45px;
      margin-bottom: 0;
    `}
  }
`;

export const Description = styled.div`
  ${textSM};
`;
