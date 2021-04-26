import styled from 'styled-components';

import Media from 'styles/media';
import { headingLG } from 'styles';

export const Wrapper = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column-reverse;

  ${Media.tablet`
    padding: 0 32px;
    flex-direction: row;
  `}
`;

export const Section = styled.div`
  margin-bottom: 32px;

  &:first-child {
    & > div:nth-child(-n + 5) {
      width: calc(50% - 8px);
      flex-grow: 2;
      display: inline-flex;

      & div {
        width: 100%;
      }

      ${Media.tablet`
         width: calc(50% - 16px);
      `}
    }

    & > div:nth-child(2n):not(:last-child) {
      margin-right: 16px;

      ${Media.tablet`
         margin-right: 32px;
      `}
    }
  }

  ${Media.tablet`
     margin-bottom: 64px;
  `}
`;

export const SectionTitle = styled.h5`
  ${headingLG};
  margin-bottom: 24px;
`;

export const LeftContent = styled.div`
  flex-basis: 280px;
  flex-grow: 1;

  ${Media.tablet`
    margin-right: 32px;
  `}

  ${Media.desktop`
    margin-right: 56px;
  `}
`;

export const RightContent = styled.div`
  margin-bottom: 32px;

  ${Media.tablet`
     max-width: 290px;
  `}
`;
