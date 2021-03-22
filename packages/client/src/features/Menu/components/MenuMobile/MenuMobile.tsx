import React, { useState, FC } from 'react';
import Icon from '@beans/icon';
import Button from '@beans/button';

import MenuItem from '../MenuItem';
import {
  menuItemsMobile,
  iconsSrc,
  itemsVisible,
  PageWithIcon,
} from '../../config/items';
import {
  Navigation,
  HiddenItems,
  VisibleItems,
  Item,
  IconWrapper,
  IconDefault,
  IconActive,
} from './styled';

export const MOBILE_MENU_TEST_ID = 'menu-mobile';
export const MOBILE_MORE_TEST_ID = 'menu-more-button';

const MenuMobile: FC = () => {
  const [isOpened, setOpened] = useState(false);

  const handleMoreClick = () => {
    setOpened(!isOpened);
  };

  return (
    <Navigation data-testid={MOBILE_MENU_TEST_ID}>
      {isOpened && (
        <HiddenItems>
          {Object.entries(menuItemsMobile.hidden).map(([page, name]) => (
            <MenuItem key={name} name={name} page={page}>
              <div>{name}</div>
            </MenuItem>
          ))}
        </HiddenItems>
      )}
      <VisibleItems amount={itemsVisible.length}>
        {Object.entries(menuItemsMobile.visible).map(([page, name]) => (
          <MenuItem key={name} name={name} page={page}>
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
        <div>
          <Item>
            <Button
              inverse
              onClick={handleMoreClick}
              data-testid={MOBILE_MORE_TEST_ID}
            >
              <Icon graphic={'actions'} size={'xl'} />
            </Button>
          </Item>
        </div>
      </VisibleItems>
    </Navigation>
  );
};

export default MenuMobile;
