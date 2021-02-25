import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import MenuItem from '../MenuItem';
import { stylesMenuItem as stylesMenuItemDesktop } from '../MenuDesktop';
import {
  TypeRenderMenuMobile,
  InterfaceStylesItemsVisible,
  InterfaceStylesButtonMore,
} from '../../config/types';
import { itemsMobile, itemButtonMore } from '../../config/items';
import { countFlexBasis, attachActiveStyle } from '../../utils';

const StyledWrapperIcon = styled.div`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  & > img {
    width: 100%;
    height: 100%;
  }
`;

const StyledIconDefault = styled.img`
  opacity: 1;
`;

const StyledIconActive = styled.img`
  position: absolute;
  left: 0;
  opacity: 0;
`;

const stylesMenuItemDefault = css`
  color: ${({ theme }) => theme.colors.active};
  background-color: ${({ theme }) => theme.colors.white};
`;

const stylesMenuItemActive = css`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};

  ${StyledIconDefault} {
    opacity: 0;
  }
  ${StyledIconActive} {
    opacity: 1;
  }
`;

const stylesMenuItem = css`
  ${stylesMenuItemDefault}

  display: flex;
  min-height: 53px;
  align-items: center;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 8px 4px;
  box-sizing: border-box;
  position: relative;
  font-size: 12px;
  line-height: 14px;
  white-space: nowrap;
  border-left: 1px solid ${({ theme }) => theme.colors.lines.base};

  &:hover {
    ${stylesMenuItemActive}
  }
`;

const stylesMenuItemOpened = `
  ${stylesMenuItemDesktop}
  max-width: 218px;
`;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledItemsHidden = styled.div`
  overflow: hidden;
`;

const StyledButtonMore = styled.div<InterfaceStylesButtonMore>`
  ${stylesMenuItem};
  cursor: pointer;
  ${attachActiveStyle}
`;

const StyledItemsVisible = styled.div<InterfaceStylesItemsVisible>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & > * {
    flex-basis: ${countFlexBasis}%;
  }
`;

const menuMobileTestId = 'menu-mobile-test-id';
const menuButtonMoreTestId = 'menu-button-more-test-id';

const MenuMobile: TypeRenderMenuMobile = () => {
  const [isOpened, setOpened] = useState(false);

  const onButtonMoreClick = () => {
    setOpened(!isOpened);
  };

  return (
    <StyledNav data-testid={menuMobileTestId}>
      {isOpened && (
        <StyledItemsHidden>
          {itemsMobile.hidden.map(({ name, page }) => (
            <MenuItem
              key={name}
              name={name}
              page={page}
              styles={stylesMenuItemOpened}
              stylesActive={stylesMenuItemActive}
            >
              <div>{name}</div>
            </MenuItem>
          ))}
        </StyledItemsHidden>
      )}
      <StyledItemsVisible amount={itemsMobile.visible.length}>
        {itemsMobile.visible.map(({ name, page, iconSrc }) => (
          <MenuItem
            key={name}
            name={name}
            page={page}
            styles={stylesMenuItem}
            stylesActive={stylesMenuItemActive}
          >
            <StyledWrapperIcon>
              <StyledIconDefault src={iconSrc?.default} alt='alt' />
              <StyledIconActive src={iconSrc?.active} alt='alt' />
            </StyledWrapperIcon>
            <div>{name}</div>
          </MenuItem>
        ))}
        <StyledButtonMore
          onClick={onButtonMoreClick}
          stylesActive={isOpened ? stylesMenuItemActive : undefined}
          data-testid={menuButtonMoreTestId}
        >
          <StyledWrapperIcon>
            <StyledIconDefault
              src={itemButtonMore.iconSrc?.default}
              alt='alt'
            />
            <StyledIconActive src={itemButtonMore.iconSrc?.active} alt='alt' />
          </StyledWrapperIcon>
          <div>{itemButtonMore.name}</div>
        </StyledButtonMore>
      </StyledItemsVisible>
    </StyledNav>
  );
};

export default MenuMobile;
export { menuMobileTestId, menuButtonMoreTestId };
