import React, { FC } from 'react';

import { menuItemsMobile } from '../../config/items';
import MenuItem from '../MenuItem';
import Links from '../Links';
import { Wrapper, ItemsList, LinksWrapper } from './styled';

type Props = {
  onItemClick?: () => void;
};

const MoreMenuMobile: FC<Props> = ({ onItemClick }) => (
  <Wrapper data-testid='more-menu-mobile'>
    <ItemsList>
      {Object.entries(menuItemsMobile.hidden).map(([page, name]) => (
        <MenuItem key={name} name={name} page={page} onClick={onItemClick}>
          {name}
        </MenuItem>
      ))}
    </ItemsList>
    <LinksWrapper>
      <Links />
    </LinksWrapper>
  </Wrapper>
);

export default MoreMenuMobile;
