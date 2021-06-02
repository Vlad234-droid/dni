import styled from 'styled-components';

import { textXX } from 'styles';
import Media from 'styles/media';

const InfoPanelReducer = styled.div`
  margin: 162px 0 54px;

  ${Media.tablet`
    margin: 60px 0;
  `}
`;

const Reducer = styled.div`
  margin: 0 16px;

  ${Media.tablet`
    margin: 0 40px;
  `}
`;

export { InfoPanelReducer, Reducer };
