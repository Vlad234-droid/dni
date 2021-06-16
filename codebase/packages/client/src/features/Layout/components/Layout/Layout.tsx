import React, { FC, useRef } from 'react';

import { ScrollContainerProvider } from 'context/ScrollContainerContext';
import { useMedia } from 'context/InterfaceContext';

import { LayoutProps } from '../../config/types';
import {
  Wrapper,
  TopHeaderContainer,
  TopHeaderReducer,
  MainHeaderContainer,
  HeaderContainer,
  HeaderReducer,
  LeftContainer,
  MainContainer,
  MainContent,
  LeftContent,
  BreadCrumbContainer,
} from './styled';

const Layout: FC<LayoutProps> = ({
  renderTopHeader,
  renderMainHeader,
  renderHeader,
  renderLeft,
  renderMain,
  renderBreadcrumb,
}) => {
  const { isMobile, isLargeMobile } = useMedia();
  const isMobileView = isMobile || isLargeMobile;
  const mainContainer = useRef<HTMLDivElement>(null);

  return (
    <Wrapper>
      <TopHeaderContainer>
        <TopHeaderReducer>{renderTopHeader()}</TopHeaderReducer>
      </TopHeaderContainer>
      <MainHeaderContainer>
        <HeaderReducer>{renderMainHeader()}</HeaderReducer>
      </MainHeaderContainer>
      <HeaderContainer>
        <HeaderReducer>
          {renderHeader()}
          {renderBreadcrumb && <BreadCrumbContainer>{renderBreadcrumb()}</BreadCrumbContainer>}
        </HeaderReducer>
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
