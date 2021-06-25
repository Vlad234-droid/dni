import styled, { css } from 'styled-components';

import Media from 'styles/media';
import { headingXS, textXS } from 'styles';

export const Wrapper = styled.div<{
  fullWidth: boolean;
}>`
  margin-top: 48px;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ fullWidth }) => css`
    ${Media.tablet`
      display: block;
      margin: 64px auto 0;
      width: ${fullWidth ? '100%' : '90%'}
    `}
  `}

  ${({ fullWidth }) => css`
    ${Media.desktop`
      width: ${fullWidth ? '100%' : '70%'}
    `}
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

export const BtnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Message = styled.div`
  ${textXS};
  color: ${({ theme }) => theme.colors.grayscale};
`;
