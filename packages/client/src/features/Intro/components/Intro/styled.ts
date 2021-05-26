import styled from 'styled-components';

import Media from 'styles/media';

export const Wrapper = styled.div.attrs({
  'data-testid': 'intro',
})`
  position: relative;
  width: 100%;
  min-height: 560px;
  max-width: 560px;
  padding: 40px 16px 149px;
  background-color: ${({ theme }) => theme.colors.tescoBlue};

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
