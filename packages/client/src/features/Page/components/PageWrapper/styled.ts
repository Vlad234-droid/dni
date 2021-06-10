import styled, { css } from 'styled-components';

import { redDot } from 'styles';
import Media from 'styles/media';

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.h3`
  font-size: 32px;
  line-height: 46px;
  color: ${({ theme }) => theme.colors.tescoBlue};

  &::after {
    ${redDot};
  }

  ${Media.tablet`
    margin-right: 32px;
    font-size: 50px;
    line-height: 71px;
  `}
`;

export const Wrapper = styled.div`
  padding: 24px 16px 0;

  ${Media.tablet`
    padding: 24px 40px 0;
  `}
`;

export const Content = styled.div<{ withBorder: boolean }>`
  ${({ theme, withBorder }) => css`
    ${Media.small_desktop`
        border: ${withBorder && `1px solid ${theme.colors.lines.base}`};
        box-shadow: ${withBorder && '0 2px 6px 0 rgba(0, 0, 0, 0.15)'};
        min-height: ${withBorder ? 'calc(100vh - 237px - 120px)' : 'auto'};
      `}
  `}
`;
