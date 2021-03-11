import React, { FC } from 'react';
import styled from 'styled-components';

import { itemsDesktop } from '../../config/items';
import MenuItem from '../MenuItem';

const Navigation = styled.nav`
  background-color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fontFamily.text};
`;

const MenuBlock = styled.div`
  padding: 10px 12px;
`;

export const MENU_DESKTOP_TEST_ID = 'menu_menu-desktop';

const MenuDesktop: FC = () => (
  <Navigation data-testid={MENU_DESKTOP_TEST_ID}>
    {itemsDesktop.map(({ name, page }) => (
      <MenuItem key={name} name={name} page={page}>
        <MenuBlock>{name}</MenuBlock>
      </MenuItem>
    ))}
  </Navigation>
);

export default MenuDesktop;
