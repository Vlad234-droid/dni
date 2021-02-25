import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import {
  InterfaceStylesMenuItem,
  TypeRenderMenuItem,
} from '../../config/types';
import { attachStyle, attachActiveStyleIfMatch } from '../../utils';

const StyledRouterLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  &:first-child > * {
    border: 0;
  }
`;

const StyledMenuItem = styled.div<InterfaceStylesMenuItem>`
  ${attachStyle}
  ${attachActiveStyleIfMatch}
`;

const menuItemTestString = 'menu-item-test-id-';

const MenuItem: TypeRenderMenuItem = ({
  name,
  page,
  children,
  styles,
  stylesActive,
}) => {
  const to = '/' + page;
  const {
    location: { pathname },
  } = useHistory();

  return (
    <StyledRouterLink
      to={to}
      title={name}
      data-testid={`${menuItemTestString}${name}`}
    >
      <StyledMenuItem
        to={to}
        path={pathname}
        styles={styles}
        stylesActive={stylesActive}
      >
        {children}
      </StyledMenuItem>
    </StyledRouterLink>
  );
};

export default MenuItem;
export { menuItemTestString };
