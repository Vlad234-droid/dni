import styled from 'styled-components';

import Media from 'styles/media';

export const Wrapper = styled.div.attrs({
  'data-testid': 'intro',
})`
  position: relative;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  color: ${({ theme }) => theme.colors.tescoBlue};
  background-color: ${({ theme }) => theme.colors.white};

  ${Media.tablet`
    flex-direction: row;
    align-items: flex-start;
  `}

  ${Media.small_desktop`
    flex-direction: column;
    align-items: center;
  `}

  ${Media.desktop`
    flex-direction: row;
    align-items: flex-start;
  `}
`;
