import React, { FC } from 'react';
import MainMenu from '@beans/primary-navigation';
import Link from '@beans/link';

import {
  mainMenuItemsDesktop,
  mainMenuItemMobile,
  mainMoreMenuItemsDesktop,
} from '../../config/items';
import { Wrapper, LinkWrapper } from './styled';

const TEST_ID = 'main-header';

const MainMenuDesktop: FC = () => (
  <Wrapper>
    <MainMenu
      menuItems={mainMenuItemsDesktop}
      mobileMenuItem={mainMenuItemMobile}
      moreMenuItem={mainMoreMenuItemsDesktop}
      currentMenuItemID='diversity-and-inclusion'
    />
    <LinkWrapper>
      <Link
        href='https://www.ourtesco.com/colleague/help'
        icon={{ graphic: 'help', position: { global: 'left' } }}
        variant='iconButton'
        inverse
      >
        Help
      </Link>
    </LinkWrapper>
  </Wrapper>
);

export { TEST_ID };

export default MainMenuDesktop;
