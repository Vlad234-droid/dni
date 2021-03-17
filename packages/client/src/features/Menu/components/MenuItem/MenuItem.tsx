import React, { FC } from 'react';
import { MenuLink } from './styled';
import { Page } from 'features/Page';

export const MENU_TEST_ID_PREFIX = 'menu-item-test-id-';

const MenuItem: FC<{ name?: string; page: string }> = ({
  name,
  page,
  children,
}) => {
  return (
    <MenuLink
      exact={page === Page.ABOUT}
      activeClassName={'active-link'}
      data-testid={`${MENU_TEST_ID_PREFIX}${name}`}
      to={`/${page}`}
      title={name}
    >
      {children}
    </MenuLink>
  );
};

export default MenuItem;
