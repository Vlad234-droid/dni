import React, { FC } from 'react';
import { Column, Grid, Row } from '@beans/grid';

import {
  Wrapper,
  HeaderContainer,
  CenterContainer,
  InnerContent,
  LeftContainer,
  RightContainer,
  FooterContainer,
  Annex,
  AnnexHeader,
  AnnexContent,
} from './styled';
import { LayoutProps } from '../../config/types';

const Layout: FC<LayoutProps> = ({
  renderHeader,
  renderFooter,
  renderLeft,
  renderCenter,
  renderRight,
  withBackground = true,
  withPaddings = true,
}) => (
  <Wrapper>
    <Annex>
      <AnnexHeader />
    </Annex>
    <Grid fixed='lg'>
      <Row>
        <Column gutter='0'>
          <HeaderContainer>{renderHeader()}</HeaderContainer>
        </Column>
      </Row>
      <Row className='row'>
        <Column gutter='0' size={5} hidden sm={{ hidden: false }}>
          <LeftContainer>{renderLeft()}</LeftContainer>
        </Column>
        <Column gutter='0' size={24} sm={renderRight ? 12 : 19}>
          <CenterContainer
            withBackground={withBackground}
            withPaddings={withPaddings}
          >
            <InnerContent withPaddings={withPaddings}>
              {renderCenter()}
            </InnerContent>
          </CenterContainer>
        </Column>
        <>
          {renderRight && (
            <Column gutter='0' hidden sm={{ size: 7, hidden: false }}>
              <RightContainer withBackground={withBackground}>
                <InnerContent withPaddings={withPaddings}>
                  {renderRight()}
                </InnerContent>
              </RightContainer>
            </Column>
          )}
        </>
      </Row>
      <Row>
        <Column size={24} gutter='0' sm={{ hidden: true }}>
          <FooterContainer>{renderFooter()}</FooterContainer>
        </Column>
      </Row>
    </Grid>
    <Annex>
      <AnnexHeader />
      {withBackground && <AnnexContent />}
    </Annex>
  </Wrapper>
);

export default Layout;
