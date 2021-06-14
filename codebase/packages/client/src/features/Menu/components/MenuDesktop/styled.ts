import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { textXS } from 'styles';
import Media from 'styles/media';

export const Wrapper = styled.nav`
  display: flex;
`;

export const Item = styled(NavLink)`
  ${textXS};
  color: ${({ theme }) => theme.colors.link.base};
  padding: 0 17px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.link.hover};
  }

  &.${(props) => props.activeClassName} {
    position: relative;
    bottom: -1px;
    border: 1px solid ${({ theme }) => theme.colors.lines.base};
    border-bottom: none;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.link.active};
    font-weight: bold;

    &::after {
      position: absolute;
      bottom: 0;
      width: calc(100% - 34px);
      display: block;
      content: '';
      height: 4px;
      background: ${({ theme }) => theme.colors.link.active};
    }
  }
`;

export const ItemInner = styled.div`
  ${Media.small_desktop`
    padding: 14px 0;
  `}
`;
