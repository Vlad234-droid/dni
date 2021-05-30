import React, { FC } from 'react';
import styled from 'styled-components';
import MainMenu from '@beans/primary-navigation';

import Media from 'styles/media';

import {
  mainMenuItems,
  mainMenuItemMobile,
  mainMoreMenuItems,
} from '../../config/items';
import HelpLink from '../HelpLink';

const TEST_ID = 'main-menu-desktop';

const MainMenuDesktop: FC = () => (
  <Wrapper>
    <MainMenu
      menuItems={mainMenuItems}
      mobileMenuItem={mainMenuItemMobile}
      moreMenuItem={mainMoreMenuItems}
      currentMenuItemID='diversity-and-inclusion'
    />
    <LinkWrapper>
      <HelpLink />
    </LinkWrapper>
  </Wrapper>
);

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  & .beans-link__anchor {
    font-size: 14px;
    line-height: 16px;
    padding-left: 0;
    padding-right: 0;
  }

  ${Media.desktop`
    font-size: 16px;
    line-height: 18px;
    padding-left: 8px;
    padding-right: 8px;
  `}
`;

export const LinkWrapper = styled.div`
  position: relative;
  bottom: 18px;
`;

export { TEST_ID };

export default MainMenuDesktop;
