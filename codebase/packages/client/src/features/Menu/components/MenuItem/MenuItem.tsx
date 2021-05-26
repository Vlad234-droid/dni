import React, { FC } from 'react';

import { Page } from 'features/Page';

import { MenuLink } from './styled';

export const MENU_TEST_ID_PREFIX = 'menu-item-';

const MenuItem: FC<{
  name?: string;
  page: string;
  onClick?: () => void;
  removeActive?: boolean;
}> = ({ name, page, children, onClick, removeActive }) => (
  <MenuLink
    exact={page === Page.ABOUT}
    activeClassName={removeActive ? '' : 'active-link'}
    data-testid={`${MENU_TEST_ID_PREFIX}${name?.toLowerCase()}`}
    to={`/${page}`}
    title={name}
    onClick={onClick}
  >
    {children}
  </MenuLink>
);

export default MenuItem;
