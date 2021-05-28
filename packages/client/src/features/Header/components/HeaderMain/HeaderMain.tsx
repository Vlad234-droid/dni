import React from 'react';
import MainMenu from '@beans/primary-navigation';
import Link from '@beans/link';

import { menuItems, mobileMenuItem, moreMenuItem } from '../../config/items';
import { Wrapper, Logo, Inner, LinkWrapper } from './styled';

const TEST_ID = 'main-header';

const HeaderMain: React.FC = () => {
  return (
    <Wrapper>
      <Logo>Our Tesco</Logo>
      <Inner>
        <MainMenu
          menuItems={menuItems}
          mobileMenuItem={mobileMenuItem}
          moreMenuItem={moreMenuItem}
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
      </Inner>
    </Wrapper>
  );
};

export { TEST_ID };

export default HeaderMain;
