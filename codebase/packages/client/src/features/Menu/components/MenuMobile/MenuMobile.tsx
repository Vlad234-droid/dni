import React, { FC, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
// import Link from '@beans/link';
import Icon from '@beans/icon';

import { menuItemsMobile } from '../../config/items';
import { getPageByPath } from '../../utils';
import MenuItemMobile, { IconWrapper } from '../MenuItemMobile';
import { ItemsList, HomeLink } from './styled';

export const TEST_ID = 'menu-mobile';

const MenuMobile: FC = () => {
  const location = useLocation();

  const isItemActive = useCallback((page: string) => getPageByPath(location.pathname) === page, [location]);

  return (
    <div data-testid={TEST_ID}>
      <ItemsList amount={5}>
        <HomeLink href='https://www.ourtesco.com/colleague'>
          <IconWrapper>
            <Icon graphic='home' />
          </IconWrapper>
          <div>Home</div>
        </HomeLink>
        {Object.entries(menuItemsMobile).map(([page, name]) => (
          <MenuItemMobile
            key={name}
            data-testid={`$menu-item-${name?.toLowerCase()}`}
            page={page}
            activeClassName={'active-link'}
            name={name!}
            isActive={isItemActive(page)}
          />
        ))}
      </ItemsList>
    </div>
  );
};

export default MenuMobile;