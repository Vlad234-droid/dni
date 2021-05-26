import React, { FC } from 'react';

import { Page } from 'features/Page';

import { menuItemsDesktop } from '../../config/items';
import { Wrapper, Item, ItemInner } from './styled';

export const MENU_TEST_ID = 'menu-desktop';
export const MENU_ITEM_TEST_IS = 'menu-item';

const MenuDesktop: FC = () => (
  <Wrapper data-testid={MENU_TEST_ID}>
    {Object.entries(menuItemsDesktop).map(([page, name]) => (
      <Item
        key={name}
        exact={page === Page.ABOUT}
        activeClassName={'active-link'}
        data-testid={`${MENU_ITEM_TEST_IS}-${name?.toLowerCase()}`}
        to={`/${page}`}
        title={name}
      >
        <ItemInner>{name}</ItemInner>
      </Item>
    ))}
  </Wrapper>
);

export default MenuDesktop;
