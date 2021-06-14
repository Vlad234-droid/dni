import React, { FC } from 'react';
import styled from 'styled-components';
import MainMenu from '@beans/primary-navigation';

import { mainMenuItems, mainMenuItemMobile, mainMoreMenuItems } from '../../config/items';
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
  height: 61px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  .beans-main-menu__container {
    height: 100%;
  }

  .beans-menu__menu-list {
    height: auto;
  }

  .beans-menu__menu-item-node {
    padding: 16px 8px;
  }
`;

export const LinkWrapper = styled.div`
  position: relative;
  top: 0;
`;

export { TEST_ID };

export default MainMenuDesktop;
