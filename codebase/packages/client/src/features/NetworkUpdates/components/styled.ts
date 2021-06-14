import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const TEST_ID = 'network-updates';

export const Wrapper = styled.nav.attrs({
  'data-testid': TEST_ID,
})`
  font-family: ${({ theme }) => theme.fontFamily.text};
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 48px;
`;

export const Title = styled.div`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.text.dark};
  font-size: 20px;
  line-height: 28px;
  font-weight: bold;
  padding: 16px;
`;

export const List = styled.div`
  margin-bottom: 19px;
`;

export const Image = styled.div`
  border-radius: 100%;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

export const Name = styled.div`
  flex: 1;
  margin: 0 10px;
`;

export const Count = styled.div`
  margin-right: 10px;
  text-align: right;
`;

export const Item = styled(NavLink)`
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
