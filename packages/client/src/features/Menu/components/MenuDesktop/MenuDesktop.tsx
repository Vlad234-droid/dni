import React, { FC } from 'react';
import styled from 'styled-components';

import { menuItemsDesktop } from '../../config/items';
import MenuItem from '../MenuItem';
import { Page } from '../../../Page';
import { useIsAdmin, useIsManager } from '../../../Auth/hooks/usePermission';

const Navigation = styled.nav`
  background-color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fontFamily.text};
`;

const MenuBlock = styled.div`
  padding: 10px 12px;
`;

export const MENU_DESKTOP_TEST_ID = 'menu-desktop';

const MenuDesktop: FC = () => {
  const isAdmin = useIsAdmin();
  const isManager = useIsManager();

  return (
    <Navigation data-testid={MENU_DESKTOP_TEST_ID}>
      {Object.entries(menuItemsDesktop)
        .filter(([el]) => {
          if (el === Page.REPORTS) {
            return isAdmin || isManager;
          }

          return true;
        })
        .map(([page, name]) => (
          <MenuItem key={name} name={name} page={page}>
            <MenuBlock>{name}</MenuBlock>
          </MenuItem>
        ))}
    </Navigation>
  );
};

export default MenuDesktop;
