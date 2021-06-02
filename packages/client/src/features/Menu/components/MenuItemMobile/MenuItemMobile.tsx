import React, { FC } from 'react';
import Icon from '@beans/icon';

import { Page } from 'features/Page';

import { iconsSrc } from '../../config/items';
import { PageWithIcon } from '../../config/types';
import { Link, IconWrapper } from './styled';

export const TEST_ID = 'menu-item-mobile';

type Props = {
  name: string;
  page: string;
  activeClassName?: string;
  isActive?: boolean;
};

const MenuItemMobile: FC<Props> = ({
  name,
  page,
  activeClassName,
  isActive,
}) => (
  <Link
    key={name}
    exact={page === Page.ABOUT}
    activeClassName={activeClassName}
    data-testid={`${TEST_ID}-${name?.toLowerCase()}`}
    to={`/${page}`}
    title={name}
  >
    <IconWrapper>
      <Icon graphic={iconsSrc[page as PageWithIcon]} inverse={isActive} />
    </IconWrapper>
    <div>{name}</div>
  </Link>
);

export default MenuItemMobile;
