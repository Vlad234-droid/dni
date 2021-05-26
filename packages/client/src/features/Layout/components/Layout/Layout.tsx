import React, { FC, useRef } from 'react';

import { ScrollContainerProvider } from 'context/ScrollContainerContext';

import { LayoutProps } from '../../config/types';
import {
  Wrapper,
  HeaderContainer,
  HeaderReducer,
  LeftContainer,
  MainContainer,
  MainContent,
  LeftContent,
} from './styled';

const Layout: FC<LayoutProps> = ({ renderHeader, renderLeft, renderMain }) => {
  const mainContainer = useRef<HTMLDivElement>(null);

  return (
    <Wrapper>
      <HeaderContainer>
        <HeaderReducer>{renderHeader()}</HeaderReducer>
      </HeaderContainer>
      <LeftContainer>
        <LeftContent>{renderLeft()}</LeftContent>
      </LeftContainer>
      <MainContainer ref={mainContainer}>
        <ScrollContainerProvider value={mainContainer}>
          <MainContent>{renderMain()}</MainContent>
        </ScrollContainerProvider>
      </MainContainer>
    </Wrapper>
  );
};

export default Layout;
