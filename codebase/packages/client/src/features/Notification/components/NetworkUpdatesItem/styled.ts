import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import tlogo from 'assets/t-logo.svg';

export const Wrapper = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.lines.base};
  font-size: 16px;
  line-height: 24px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.dark};

    circle {
      fill: ${({ theme }) => theme.colors.white};
    }
  }

  &.${(props) => props.activeClassName} {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};

    & .beans-icon__svg {
      stroke: ${({ theme }) => theme.colors.white};
    }
  }
`;

export const Avatar = styled.div<{
  avatar: string;
}>`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  background-image: url(${({ avatar }) => (avatar.length > 0 ? avatar : tlogo)});
  background-color: ${({ theme }) => theme.colors.tost};
  overflow: hidden;
  position: relative;
`;

export const Name = styled.div`
  flex: 1;
  margin: 0 10px;
`;

export const Count = styled.div`
  margin-right: 10px;
  text-align: right;
  font-size: 14px;
  line-height: 20px;
`;
