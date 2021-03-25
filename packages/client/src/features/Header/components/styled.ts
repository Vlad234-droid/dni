import styled from 'styled-components';

import Media from 'styles/media';

export const Wrapper = styled.div.attrs({
  'data-testid': 'header',
})`
  box-sizing: border-box;
  width: 100%;
  margin: auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;

  ${Media.desktop`
    max-width:  1366px;
    padding: 0 24px;
  `}

  ${Media.large_desktop`
    max-width: 1523px;
  `}
`;

export const Block = styled.div`
  display: flex;
  height: 100%;
  align-content: center;
  align-items: center;
`;
