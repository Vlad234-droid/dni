import React, { FC } from 'react';
import { Page } from 'features/Page';
import { useIsAdmin, useIsManager } from '../../../Auth/hooks/usePermission';

import { menuItemsDesktop } from '../../config/items';
import { Wrapper, Item, ItemInner } from './styled';

export const TEST_ID = 'menu-desktop';
export const ITEM_TEST_ID = 'menu-item';

const MenuDesktop: FC = () => {
  const isAdmin = useIsAdmin();
  const isManager = useIsManager();

  return (
    <Wrapper data-testid={TEST_ID}>
      {Object.entries(menuItemsDesktop)
        .filter(([el]) => {
          if (el === Page.REPORTS) {
            return isAdmin || isManager;
          }

          return true;
        })
        .map(([page, name]) => (
          <Item
            key={name}
            exact={page === Page.ABOUT}
            activeClassName={'active-link'}
            data-testid={`${ITEM_TEST_ID}-${name?.toLowerCase()}`}
            to={`/${page}`}
            title={name}
          >
            <ItemInner>{name}</ItemInner>
          </Item>
        ))}
    </Wrapper>
  );
};

export default MenuDesktop;
