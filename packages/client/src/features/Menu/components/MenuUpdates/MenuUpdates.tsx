import React from 'react';
import styled, { css } from 'styled-components';

import { TypeRenderMenuUpdates } from '../../config/types';
import { itemsUpdates } from '../../config/items';
import MenuItem from '../MenuItem';

const StyledWrapperImage = styled.div`
  border-radius: 100%;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const StyledName = styled.div`
  margin: 0 10px;
`;

const StyledCount = styled.div`
  margin-right: 10px;
  text-align: right;
`;

const StyledCycle = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const StyledTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.base};
  font-size: 12px;
  line-height: 22px;
  padding: 32px 0 10px;
  text-transform: uppercase;
`;

const stylesMenuItemDefault = css`
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.white};
`;

const stylesMenuItemActive = css`
  background-color: ${({ theme }) => theme.colors.background.dark};
`;

const stylesMenuItem = css`
  ${stylesMenuItemDefault};
  display: grid;
  align-items: center;
  min-height: 60px;
  padding: 13px 12px 15px;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.lines.base};
  grid-template-columns: 32px auto auto 8px;
  &:hover {
    ${stylesMenuItemActive}
  }
`;

const StyledNav = styled.nav`
  font-family: ${({ theme }) => theme.fontFamily.text};
  background-color: ${({ theme }) => theme.colors.white};
`;

const menuUpdatesTestId = 'menu-updates-test-id';

const MenuUpdates: TypeRenderMenuUpdates = () => (
  <StyledNav data-testid={menuUpdatesTestId}>
    <StyledTitle>Updates in my Networks</StyledTitle>
    {itemsUpdates.map(({ name, page, count, imageSrc }) => (
      <MenuItem
        key={name}
        name={name}
        page={page}
        styles={stylesMenuItem}
        stylesActive={stylesMenuItemActive}
      >
        <StyledWrapperImage>
          <img src={imageSrc} alt='alt' />
        </StyledWrapperImage>
        <StyledName>{name}</StyledName>
        <StyledCount>{Boolean(count) && count}</StyledCount>
        {Boolean(count) && <StyledCycle />}
      </MenuItem>
    ))}
  </StyledNav>
);

export default MenuUpdates;
export { menuUpdatesTestId };
