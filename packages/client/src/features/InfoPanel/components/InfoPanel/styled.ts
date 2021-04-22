import styled, { css } from 'styled-components';

import { headingSM } from 'styles';
import Media from 'styles/media';

import { Type } from '../../config/types';

export const Wrapper = styled.div.attrs({
  'data-testid': 'info-panel',
})<{ type: Type; isSmall: boolean }>`
  position: relative;
  display: flex;
  align-items: start;
  padding: 24px 16px 32px;
  background: ${({ theme, type }) => theme.colors.background[type]};

  ${({ isSmall }) =>
    !isSmall &&
    css`
      ${Media.tablet`
      padding: '48px 65.5px 54px';
      align-items: 'center';
    `}
    `}
`;

export const Content = styled.div<{ type: Type; isSmall: boolean }>`
  margin-left: ${({ type }) => (type === Type.INFO ? '0' : '12px')};
  width: 100%;
  text-align: ${({ type }) => (type === Type.INFO ? 'center' : 'left')};

  ${({ type, isSmall }) =>
    !isSmall &&
    css`
      ${Media.tablet`
        margin-left: ${type === Type.INFO ? '0' : '65.5px'};
    `}
    `}
`;

export const Title = styled.h2<{ isSmall: boolean }>`
  color: ${({ theme }) => theme.colors.tescoBlue};
  margin-bottom: 16px;
  ${headingSM}

  ${({ isSmall }) =>
    !isSmall &&
    css`
      ${Media.tablet`
      margin-bottom: 24px;
      font-size: 32px;
      line-height: 45px;
    `}
    `}
`;

export const CloseIcon = styled.span<{ isSmall: boolean }>`
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ isSmall }) =>
    !isSmall &&
    css`
      ${Media.tablet`
      right: 16px;
      top: 16px;
    `}
    `}
`;
