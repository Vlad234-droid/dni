import styled from 'styled-components';

import Media from 'styles/media';

const InfoPanelReducer = styled.div`
  margin: 182px 0 54px;

  ${Media.tablet`
    margin: 0 0 60px;
  `}
`;

const Reducer = styled.div`
  margin: 0 16px 54px;

  ${Media.tablet`
    margin: 0 40px 64px;
  `}
`;

export { InfoPanelReducer, Reducer };
