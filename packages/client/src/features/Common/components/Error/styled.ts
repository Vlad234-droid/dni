import styled from 'styled-components';

import Media from 'styles/media';
import { headingXS, textXS } from 'styles';

export const Wrapper = styled.div`
  margin-top: 48px;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${Media.tablet`
     display: block;
     width: 90%;
     margin: 64px auto 0;
  `}

  ${Media.desktop`
     width: 70%;
  `}
`;

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.background.error};
  margin-bottom: 32px;
  display: flex;
  padding: 12px;
`;

export const IconWrapper = styled.div`
  margin-right: 16px;
`;

export const Content = styled.div`
  padding: 10px 0;
`;

export const Title = styled.div`
  ${headingXS};
  font-weight: bold;
`;

export const Message = styled.div`
  ${textXS};
  color: ${({ theme }) => theme.colors.grayscale};
`;
