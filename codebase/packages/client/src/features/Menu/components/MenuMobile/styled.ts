import styled from 'styled-components';
import Link from '@beans/link';

import { LinkStyles } from '../MenuItemMobile';

export const ItemsList = styled.div<{ amount: number }>`
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;

  & > * {
    flex: 0 0 ${({ amount }) => 100 / amount}%;
  }
`;

export const HomeLink = styled(Link)`
  ${LinkStyles};
`;
