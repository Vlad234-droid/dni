import { HTMLProps } from 'react';
import styled, { css } from 'styled-components';

import Media from 'styles/media';

import { LayoutProps } from '../../config/types';

type Props = HTMLProps<HTMLDivElement>;

export const Wrapper = styled.div<Props>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 53px 1fr 60px;
  grid-template-areas: 'header' 'main' 'left';
  height: 100vh;

  ${Media.small_desktop`
    grid-template-columns: minmax(15px, 1fr) 240px minmax(auto, 1066px) minmax(
      15px,
      1fr
    );
    grid-template-rows: 53px 1fr;
    grid-template-areas: 'header header header header' '. left main main';
  `}

  ${Media.large_desktop`
    grid-template-columns: minmax(15px, 1fr) 240px minmax(auto, 1232px) minmax(
      15px,
      1fr
    );
    grid-template-rows: 53px 1fr;
    grid-template-areas: 'header header header header' '. left main main';
  `}
`;

export const HeaderContainer = styled.div.attrs({
  'data-testid': 'main-header',
})<Props>`
  position: relative;
  z-index: 1000;
  grid-area: header;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);

  ${({ theme }) => css`
    ${Media.large_tablet`
        box-shadow: none;
        border-bottom: 1px solid ${theme.colors.lines.base};
    `}
  `}
`;

export const LeftContainer = styled.div.attrs({
  'data-testid': 'left-content',
})`
  grid-area: left;
  overflow-y: auto;
`;

export const MainContainer = styled.div.attrs({
  'data-testid': 'main-content',
})<Partial<LayoutProps>>`
  grid-area: main;
  overflow-y: auto;
  background-color: ${({ theme, withBackground }) =>
    withBackground ? theme.colors.background.dark : 'transparent'};

  ${({ theme }) => css`
    ${Media.small_desktop`
        border-left: 1px solid ${theme.colors.lines.base};
    `}
  `}
`;

export const Content = styled.div`
  ${Media.large_tablet`
     max-width: 1066px;
  `}

  ${Media.large_desktop`
     max-width: 1232px;
  `}
`;
