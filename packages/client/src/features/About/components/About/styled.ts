import styled from 'styled-components';
import backgroundImage from '../../assets/banner.jpg';

export const Wrapper = styled.div.attrs({
  'data-testid': 'about',
})`
  background: url(${backgroundImage}) no-repeat center;
  background-size: cover;
  width: 100%;
  min-height: 560px;
  position: relative;

  &::after {
    content: '';
    background-color: ${({ theme }) => theme.colors.tescoBlue};
    opacity: 0.9;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const Reducer = styled.div`
  position: relative;
  padding: 48px 48px 80px;
  z-index: 2;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.white};
`;
