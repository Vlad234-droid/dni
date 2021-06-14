import styled from 'styled-components';

import Media from 'styles/media';

const InfoPanelReducer = styled.div`
  margin: 162px 0 54px;

  ${Media.tablet`
    margin: 60px 0;
  `}
`;

const Reducer = styled.div`
  margin: 0 16px 32px;

  ${Media.tablet`
    margin: 0 40px 64px;
  `}
`;

export { InfoPanelReducer, Reducer };
