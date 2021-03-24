import React, { FC } from 'react';
import Link from '@beans/link';

import { menuItemsMobile } from '../../config/items';
import MenuItem from '../MenuItem';
import { Wrapper, ItemsList, Links } from './styled';

const MoreMenuMobile: FC = () => (
  <Wrapper>
    <ItemsList>
      {Object.entries(menuItemsMobile.hidden).map(([page, name]) => (
        <MenuItem key={name} name={name} page={page}>
          {name}
        </MenuItem>
      ))}
    </ItemsList>
    <Links>
      <Link href='#'>Colleague Help</Link>
      <Link href='#'>Terms & Conditions</Link>
    </Links>
  </Wrapper>
);

export default MoreMenuMobile;
