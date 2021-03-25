import React, { FC } from 'react';

import { MenuLink } from './styled';

export const MENU_TEST_ID_PREFIX = 'menu-item-';

const MenuItem: FC<{ name?: string; page: string }> = ({
  name,
  page,
  children,
}) => (
  <MenuLink
    exact={true}
    activeClassName={'active-link'}
    data-testid={`${MENU_TEST_ID_PREFIX}${name}`}
    to={`/${page}`}
    title={name}
  >
    {children}
  </MenuLink>
);

export default MenuItem;
