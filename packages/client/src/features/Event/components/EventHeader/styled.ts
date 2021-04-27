import styled from 'styled-components';

import Media from 'styles/media';
import { headingMD, headingSM, headingXX } from 'styles';

export const Wrapper = styled.div`
  padding: 0 16px 24px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.lines.base}`};

  ${Media.tablet`
     padding: 0 24px 24px;
  `}
`;

export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 17px;
`;

export const StatusWrapper = styled.div`
  margin-right: 33px;
`;

export const EventDate = styled.div`
  ${headingSM};
  margin-bottom: 16px;
`;

export const Participants = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${headingXX};
  color: ${({ theme }) => theme.colors.grayscale};
  height: 40px;
`;

export const MaxParticipants = styled(Participants)`
  margin-bottom: 16px;
`;

export const Actions = styled.div`
  display: flex;
  align-items: flex-start;

  & div:not(:last-child) {
    margin-right: 8px;
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
