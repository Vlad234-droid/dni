import styled from 'styled-components';

import { headingSM, textXS } from 'styles';
import Media from 'styles/media';

export const Wrapper = styled.div`
  position: relative;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding: 24px 16px 0;

  ${Media.tablet`
    padding: 32px 40px 0 32px;
    flex-direction: row;
  `}
`;

export const LeftContent = styled.div`
  flex-basis: 288px;
  flex-grow: 1;
  margin-bottom: 64px;

  ${Media.tablet`
    margin-bottom: 0;
  `}
`;

export const RightContent = styled.div`
  margin-bottom: 24px;

  ${Media.tablet`
    margin-bottom: 0;
    margin-left: 32px;
  `}
`;

export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px 40px;
  background: ${({ theme }) => theme.colors.background.info};
  text-align: center;
  ${textXS};

  p {
    margin-bottom: 8px;
  }

  ${Media.tablet`
    padding: 32px 42px 64px 49px;
    font-size: 20px;
    line-height: 28px;
  `}
`;

export const DescriptionTitle = styled.h5`
  color: ${({ theme }) => theme.colors.tescoBlue};
  margin-bottom: 16px;
  ${headingSM};

  ${Media.tablet`
    margin-bottom: 8px;
    font-size: 32px;
    line-height: 45px;
  `}
`;
