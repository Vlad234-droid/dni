import React, { FC, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '@beans/icon';

import { Page } from 'features/Page';

import { menuItemsMobile } from '../../config/items';
import MenuItemMobile, { IconWrapper } from '../MenuItemMobile';
import { ItemsList, HomeLink } from './styled';
import { OURTESCO_URL, PUBLIC_URL } from 'config/constants';

export const TEST_ID = 'menu-mobile';

const MenuMobile: FC = () => {
  const location = useLocation();

  const isItemActive = useCallback(
    (page: string) => {
      if (page === Page.ABOUT) {
        return (
          location.pathname === '/' || location.pathname === `${PUBLIC_URL}/` || location.pathname === `${PUBLIC_URL}`
        );
      }

      return location.pathname.includes(page);
    },
    [location],
  );

  return (
    <div data-testid={TEST_ID}>
      <ItemsList amount={5}>
        <HomeLink href={`${OURTESCO_URL}/colleague`}>
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
