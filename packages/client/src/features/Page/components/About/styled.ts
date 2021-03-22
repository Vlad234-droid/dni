import styled from 'styled-components';

import { textXX } from 'styles';
import Media from 'styles/media';

const InfoPanelReducer = styled.div`
  margin: 54px 0;

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

const Footer = styled.div.attrs({
  'data-testid': 'about-footer',
})`
  margin-bottom: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.grayscale};
  ${textXX}
`;

export { InfoPanelReducer, Reducer, Footer };
