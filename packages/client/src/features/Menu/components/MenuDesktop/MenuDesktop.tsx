import React from 'react';
import styled, { css } from 'styled-components';

import { TypeRenderMenuDesktop } from '../../config/types';
import { itemsDesktop } from '../../config/items';
import MenuItem from '../MenuItem';

const stylesMenuItemDefault = css`
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.white};
`;

const stylesMenuItemActive = css`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
`;

const stylesMenuItem = css`
  ${stylesMenuItemDefault};
  display: flex;
  min-height: 40px;
  padding: 10px 12px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 20px;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.lines.base};
  &:hover {
    ${stylesMenuItemActive}
  }
`;

const StyledNav = styled.nav`
  background-color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fontFamily.text};
`;

const menuDesktopTestId = 'menu-desktop-test-id';

const MenuDesktop: TypeRenderMenuDesktop = () => (
  <StyledNav data-testid={menuDesktopTestId}>
    {itemsDesktop.map(({ name, page }) => (
      <MenuItem
        key={name}
        name={name}
        page={page}
        styles={stylesMenuItem}
        stylesActive={stylesMenuItemActive}
      >
        <div>{name}</div>
      </MenuItem>
    ))}
  </StyledNav>
);

export default MenuDesktop;
export { menuDesktopTestId, stylesMenuItem };
