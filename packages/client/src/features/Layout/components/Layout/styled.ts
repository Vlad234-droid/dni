import { HTMLProps } from 'react';
import styled from 'styled-components';
import Media from 'styles/media';

type Props = HTMLProps<HTMLDivElement>;

export const Wrapper = styled.div<Props>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 53px 1fr 60px;
  grid-template-areas: 'header' 'main' 'left';
  height: 100vh;

  ${Media.tablet`
    grid-template-columns: minmax(15px, 1fr) 240px minmax(auto, 1004px) minmax(
      15px,
      1fr
    );
    grid-template-rows: 53px 1fr;
    grid-template-areas: 'header header header header' '. left main main';
  `} {
  }
`;

export const HeaderContainer = styled.div.attrs({
  'data-testid': 'main-header',
})<Props>`
  position: relative;
  z-index: 2;
  box-shadow: 0 0 10px var(--line-color);
  grid-area: header;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lines.base};
  padding: 0 15px;
`;

export const LeftContainer = styled.div.attrs({
  'data-testid': 'left-content',
})`
  grid-area: left;
  overflow-y: auto;
`;

export const MainContainer = styled.div.attrs({
  'data-testid': 'main-content',
})`
  grid-area: main;
  overflow-y: auto;
  border-left: 1px solid ${({ theme }) => theme.colors.lines.base};
`;

export const Content = styled.div`
  max-width: 1004px;
`;
