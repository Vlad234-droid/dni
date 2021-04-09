import React, { useState, FC } from 'react';
import { useLocation } from 'react-router-dom';

import MenuItem from '../MenuItem';
import MoreButton from '../MoreButton';
import MoreMenuMobile from '../MoreMenuMobile';
import { menuItemsMobile, iconsSrc, itemsVisible } from '../../config/items';
import { PageWithIcon } from '../../config/types';
import {
  Navigation,
  ItemsList,
  Item,
  IconWrapper,
  IconDefault,
  IconActive,
} from './styled';

export const MOBILE_MENU_TEST_ID = 'menu-mobile';

const MenuMobile: FC = () => {
  const [isOpened, setOpened] = useState(false);
  const location = useLocation();

  const handleMoreClick = () => {
    setOpened(!isOpened);
  };

  const handleMenuItemClick = () => {
    setOpened(false);
  };

  return (
    <Navigation data-testid={MOBILE_MENU_TEST_ID}>
      {isOpened && <MoreMenuMobile onItemClick={handleMenuItemClick} />}
      <ItemsList amount={itemsVisible.length}>
        {Object.entries(menuItemsMobile.visible).map(([page, name]) => (
          <MenuItem
            key={name}
            name={name}
            page={page}
            removeActive={isOpened}
            onClick={handleMenuItemClick}
          >
            <Item>
              <IconWrapper>
                <IconDefault
                  src={iconsSrc[page as PageWithIcon]?.default}
                  alt='alt'
                />
                <IconActive
                  src={iconsSrc[page as PageWithIcon]?.active}
                  alt='alt'
                />
              </IconWrapper>
              <div>{name}</div>
            </Item>
          </MenuItem>
        ))}
        <MoreButton
          onClick={handleMoreClick}
          isOpened={isOpened}
          pathname={location.pathname}
        />
      </ItemsList>
    </Navigation>
  );
};

export default MenuMobile;
