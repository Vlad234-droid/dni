import { HTMLProps } from 'react';
import styled, { css } from 'styled-components';

import Media from 'styles/media';
import {
  GREY_COLOR,
  TOP_HEADER_HEIGHT,
  MAIN_HEADER_HEIGHT,
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
    grid-template-rows:  ${TOP_HEADER_HEIGHT} ${MAIN_HEADER_HEIGHT} ${HEADER_HEIGHT_DESKTOP} 1fr;
    grid-template-areas: 'top-header top-header top-header top-header' 'main-header main-header main-header main-header' 'header header header header' 'left left main main';
  `}

  ${Media.large_desktop`
    grid-template-columns: minmax(${PADDING}, 1fr) ${SIDEBAR_WIDTH} minmax(auto, ${MAIN_WIDTH_LARGE}) minmax(
      ${PADDING},
      1fr
    );
    grid-template-rows:  ${TOP_HEADER_HEIGHT} ${MAIN_HEADER_HEIGHT} ${HEADER_HEIGHT_DESKTOP} 1fr;
    grid-template-areas: 'top-header top-header top-header top-header' 'main-header main-header main-header main-header' 'header header header header' '. left main main';
  `}
`;

const stylesHeader = css`
  position: relative;
  z-index: 1000;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: 'header-reducer';

  ${Media.small_desktop`
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
`;

export const TopHeaderContainer = styled.div.attrs({
  'data-testid': 'top-header-container',
})<Props>`
  display: none;

  ${({ theme }) => css`
    ${Media.small_desktop`
        grid-area: top-header;
        background-color: ${theme.colors.tescoBlue};
        ${stylesHeader};
    `}
  `}
`;

export const MainHeaderContainer = styled.div.attrs({
  'data-testid': 'main-header-container',
})<Props>`
  display: none;

  ${Media.small_desktop`
    grid-area: main-header;
    ${stylesHeader};
  `}
`;

export const HeaderContainer = styled.div.attrs({
  'data-testid': 'header-container',
})<Props>`
  ${stylesHeader};
  grid-area: header;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);

  ${Media.small_desktop`
    background-color: ${GREY_COLOR};
  `}

  ${({ theme }) => css`
    ${Media.large_tablet`
      box-shadow: none;
      border-bottom: 1px solid ${theme.colors.lines.base};
    `}
  `}
`;

export const HeaderReducer = styled.div`
  position: relative;

  ${Media.small_desktop`
    grid-area: header-reducer;
  `}
`;

export const TopHeaderReducer = styled(HeaderReducer)`
  ${Media.small_desktop`
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `}
`;

export const BreadCrumbContainer = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);

  & .beans-breadcrumb__container {
    background-color: ${GREY_COLOR};

    ${({ theme }) => css`
      ${Media.large_tablet`
          border-top: 1px solid ${theme.colors.lines.base};
          border-left: 1px solid ${theme.colors.lines.base};
      `}
    `}
  }

  ${Media.small_desktop`
     left: ${SIDEBAR_WIDTH};
     width: calc(100% - ${SIDEBAR_WIDTH});
     box-shadow: none;
  `}
`;

export const LeftContainer = styled.div.attrs({
  'data-testid': 'left-content',
})`
  grid-area: left;
  position: fixed;
  z-index: 2000;
  bottom: 0;
  left: 0;
  right: 0;

  ${Media.small_desktop`
    position: static;
  `}
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
