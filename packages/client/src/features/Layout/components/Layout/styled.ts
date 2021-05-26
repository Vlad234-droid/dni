import { HTMLProps } from 'react';
import styled, { css } from 'styled-components';

import Media from 'styles/media';
import {
  GREY_COLOR,
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
  FOOTER_HEIGHT,
} from 'styles';

import { LayoutProps } from '../../config/types';

type Props = HTMLProps<HTMLDivElement>;

const SIDEBAR_WIDTH = '240px';
const MAIN_WIDTH_SMALL = '1007px';
//MAIN_WIDTH_SMALL + PADDING
const MAIN_CONTENT_WIDTH_SMALL = '1021px';
const MAIN_WIDTH_LARGE = '1232px';
//MAIN_WIDTH_LARGE + PADDING
const MAIN_CONTENT_WIDTH_LARGE = '1246px';
// SIDEBAR_WIDTH + MAIN_WIDTH_SMALL
const HEADER_WIDTH_SMALL = '1247px';
// SIDEBAR_WIDTH + MAIN_WIDTH_LARGE
const HEADER_WIDTH_LARGE = '1472px';
const PADDING = '15px';

export const Wrapper = styled.div<Props>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${HEADER_HEIGHT_MOBILE} 1fr ${FOOTER_HEIGHT};
  grid-template-areas: 'header' 'main' 'left';
  height: 100vh;

  ${Media.small_desktop`
    grid-template-columns: minmax(${PADDING}, 1fr) ${SIDEBAR_WIDTH} minmax(auto, ${MAIN_WIDTH_SMALL}) minmax(
      ${PADDING},
      1fr
    );
    grid-template-rows: ${HEADER_HEIGHT_DESKTOP} 1fr;
    grid-template-areas: 'header header header header' 'left left main main';
  `}

  ${Media.large_desktop`
    grid-template-columns: minmax(${PADDING}, 1fr) ${SIDEBAR_WIDTH} minmax(auto, ${MAIN_WIDTH_LARGE}) minmax(
      ${PADDING},
      1fr
    );
    grid-template-rows: ${HEADER_HEIGHT_DESKTOP} 1fr;
    grid-template-areas: 'header header header header' '. left main main';
  `}
`;

export const HeaderContainer = styled.div.attrs({
  'data-testid': 'header-container',
})<Props>`
  position: relative;
  z-index: 1000;
  grid-area: header;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: 'header-reducer';

  ${Media.small_desktop`
    background-color: ${GREY_COLOR};
    grid-template-columns: minmax(${PADDING}, 1fr) minmax(auto, ${HEADER_WIDTH_SMALL}) minmax(
      ${PADDING},
      1fr
    );
    grid-template-areas: '. header-reducer .';
  `}

  ${Media.large_desktop`
    grid-template-columns: minmax(${PADDING}, 1fr) minmax(auto, ${HEADER_WIDTH_LARGE}) minmax(
      ${PADDING},
      1fr
    );
    grid-template-areas: '. header-reducer .';
  `}

  ${({ theme }) => css`
    ${Media.large_tablet`
        box-shadow: none;
        border-bottom: 1px solid ${theme.colors.lines.base};
    `}
  `}
`;

export const HeaderReducer = styled.div`
  grid-area: header-reducer;
`;

export const LeftContainer = styled.div.attrs({
  'data-testid': 'left-content',
})`
  grid-area: left;
`;

export const MainContainer = styled.div.attrs({
  'data-testid': 'main-content',
})<Partial<LayoutProps>>`
  grid-area: main;
  overflow-y: auto;

  ${({ theme }) => css`
    ${Media.small_desktop`
        border-left: 1px solid ${theme.colors.lines.base};
    `}
  `}
`;

export const LeftContent = styled.div`
  margin-left: auto;

  ${Media.small_desktop`
     max-width: ${SIDEBAR_WIDTH};
  `}
`;

export const MainContent = styled.div`
  margin-right: auto;
  height: 100%;

  ${Media.small_desktop`
    padding-right: ${PADDING};
  `}

  ${Media.desktop`
    max-width: ${MAIN_CONTENT_WIDTH_SMALL};
  `}
  
  ${Media.large_desktop`
     max-width: ${MAIN_CONTENT_WIDTH_LARGE};
  `}
`;
