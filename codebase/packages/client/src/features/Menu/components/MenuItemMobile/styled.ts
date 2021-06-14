import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

export const LinkStyles = css`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.white};
  display: block;
  padding: 8px 4px;
  font-size: 12px;
  line-height: 14px;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.dark};
  }

  & svg {
    stroke-width: 1.2;
  }
`;

export const Link = styled(NavLink)`
  ${LinkStyles};

  &.${(props) => props.activeClassName} {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};

    & .beans-icon__svg {
      stroke: ${({ theme }) => theme.colors.white};
    }
  }
`;

export const IconWrapper = styled.div`
  height: 23px;
  overflow: hidden;
  position: relative;
  margin: 0 auto 2px;
`;
