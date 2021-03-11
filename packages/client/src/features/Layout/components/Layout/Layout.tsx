import React, { FC } from 'react';
import {
  Wrapper,
  HeaderContainer,
  LeftContainer,
  MainContainer,
  Content,
} from './styled';
import { LayoutProps } from '../../config/types';

const Layout: FC<LayoutProps> = ({ renderHeader, renderLeft, renderMain }) => (
  <Wrapper>
    <HeaderContainer>{renderHeader()}</HeaderContainer>
    <LeftContainer>{renderLeft()}</LeftContainer>
    <MainContainer>
      <Content>{renderMain()}</Content>
    </MainContainer>
  </Wrapper>
);

export default Layout;
