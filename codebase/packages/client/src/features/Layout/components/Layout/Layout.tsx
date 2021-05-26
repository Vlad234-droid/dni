import React, { FC, useRef } from 'react';
import {
  Wrapper,
  HeaderContainer,
  LeftContainer,
  MainContainer,
  Content,
} from './styled';
import { LayoutProps } from '../../config/types';
import { ScrollContainerProvider } from 'context/ScrollContainerContext';

const Layout: FC<LayoutProps> = ({
  renderHeader,
  renderLeft,
  renderMain,
  withBackground = true,
}) => {
  const mainContainer = useRef<HTMLDivElement>(null);
  return (
    <Wrapper>
      <HeaderContainer>{renderHeader()}</HeaderContainer>
      <LeftContainer>{renderLeft()}</LeftContainer>
      <MainContainer ref={mainContainer} withBackground={withBackground}>
        <ScrollContainerProvider value={mainContainer}>
          <Content>{renderMain()}</Content>
        </ScrollContainerProvider>
      </MainContainer>
    </Wrapper>
  );
};

export default Layout;
