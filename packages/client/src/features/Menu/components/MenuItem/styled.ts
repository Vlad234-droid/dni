import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Media from 'styles/media';

const stylesMenuItemDefault = css`
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.white};
`;

const stylesMenuItemActive = css`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
`;

const stylesMenuItem = css`
  ${stylesMenuItemDefault};
  display: block;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 20px;

  &:hover {
    ${stylesMenuItemActive}
  }

  ${({ theme }) => css`
    ${Media.tablet`
        &:first-child {
          border: 0;
        }
        border-top: 1px solid ${theme.colors.lines.base};
    `}
  `}
`;

export const MenuLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  ${stylesMenuItem};

  &.${(props) => props.activeClassName} {
    ${stylesMenuItemActive};
  }
`;
