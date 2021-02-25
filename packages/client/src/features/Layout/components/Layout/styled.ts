import { HTMLProps } from 'react';
import styled, { css } from 'styled-components';

import { ConfigLayoutProps } from '../../config/types';

type Props = HTMLProps<HTMLDivElement>;

export const Wrapper = styled.div<Props>`
  // height is required for Annex content as it will not know the exact height of header
  --header-height: 53px;
  --footer-height: 53px;
  --padding: 12px;
  --extra-padding: 16px;
  --border: 1px;
  --line-color: ${({ theme }) => theme.colors.lines.base};
  --background: ${({ theme }) => theme.colors.background.dark};

  position: relative;
  display: flex;
`;

export const HeaderContainer = styled.div.attrs({
  'data-testid': 'header-layout',
})<Props>`
  position: relative;
  z-index: 2;
  height: var(--header-height);
  padding: 0 var(--extra-padding);
  box-shadow: 0 0 10px var(--line-color);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    position: static;
    padding: 0 var(--padding);
    box-shadow: none;
    border-bottom: 1px solid var(--line-color);
  }
`;

// each column content gets these styles
export const Content = css<ConfigLayoutProps>`
  --background: ${({ theme }) => theme.colors.background.dark};

  min-height: calc(100vh - var(--header-height) - var(--footer-height));

  padding: 0 var(--padding);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    padding: 0;
    height: 100%;
    min-height: calc(100vh - var(--header-height) - var(--border));
  }
`;

export const InnerContent = styled.div<ConfigLayoutProps>`
  padding-top: var(--extra-padding);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    padding-top: ${({ withPaddings }) =>
      withPaddings ? 'calc(var(--padding) * 2 + var(--extra-padding))' : '0px'};
  }
`;

export const LeftContainer = styled.aside.attrs({
  'data-testid': 'left-content',
})<ConfigLayoutProps>`
  ${Content}
  padding-top: calc(var(--padding) * 2 + var(--extra-padding));
  padding-left: var(--padding);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    padding: ${({ withPaddings }) =>
        withPaddings
          ? 'calc(var(--padding) * 2 + var(--extra-padding))'
          : '0px'}
      0 0;
  }
`;

export const CenterContainer = styled.main.attrs({
  'data-testid': 'center-content',
})<ConfigLayoutProps>`
  --padding-left: ${({ withPaddings }) =>
    withPaddings ? 'calc(var(--padding) * 2 + var(--extra-padding))' : '0'};
  --padding-right: ${({ withPaddings }) =>
    withPaddings ? 'var(--padding)' : '0'};

  ${Content}
  background: ${({ withBackground }) =>
    withBackground ? 'var(--background)' : 'transparent'};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    padding-left: var(--padding-left);
    padding-right: var(--padding-right);
    border-left: 1px solid var(--line-color);
  }
`;

export const RightContainer = styled.div.attrs({
  'data-testid': 'right-content',
})<ConfigLayoutProps>`
  ${Content}
  background: ${({ withBackground }) =>
    withBackground ? 'var(--background)' : 'transparent'};
  padding-left: calc(var(--padding) + var(--extra-padding));
  padding-right: var(--padding);
`;

// fixed on mobile
export const FooterContainer = styled.div.attrs({
  'data-testid': 'footer-layout',
})<Props>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100; // need to be on the top of everything
  height: var(--footer-height);
`;

// additional column for large desktops to make background fit the screen
export const Annex = styled.div<Props>`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    display: block;
    flex-grow: 2;
  }
`;

export const AnnexHeader = styled.div<Props>`
  height: var(--header-height);
  border-bottom: 1px solid var(--line-color);
`;

export const AnnexContent = styled.div<ConfigLayoutProps>`
  height: calc(100% - var(--header-height) - var(--border));
  background: var(--background);
`;
