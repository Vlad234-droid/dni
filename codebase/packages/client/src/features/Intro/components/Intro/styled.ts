import styled from 'styled-components';

import Media from 'styles/media';

import backgroundImage from '../../assets/banner.jpg';

export const Wrapper = styled.div.attrs({
  'data-testid': 'intro',
})`
  background: url(${backgroundImage}) no-repeat center;
  background-size: cover;
  width: 100%;
  min-height: 560px;
  position: relative;
  display: flex;
  justify-content: center;

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
  padding: 40px 16px 149px;
  z-index: 2;
  max-width: 560px;

  ${Media.tablet`
     padding: 48px 48px 80px;
     max-width: unset;
  `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};

  ${Media.tablet`
     flex-direction: row;
       align-items: flex-start;
  `}
`;
