import React, { FC } from 'react';

import { Page } from 'features/Page';

import { MenuLink } from './styled';

export const MENU_TEST_ID_PREFIX = 'menu-item-';

const MenuItem: FC<{ name?: string; page: string; onClick?: () => void }> = ({
  name,
  page,
  children,
  onClick,
}) => (
  <MenuLink
    exact={page === Page.ABOUT}
    activeClassName={'active-link'}
    data-testid={`${MENU_TEST_ID_PREFIX}${name}`}
    to={`/${page}`}
    title={name}
    onClick={onClick}
  >
    {children}
  </MenuLink>
);

export default MenuItem;
