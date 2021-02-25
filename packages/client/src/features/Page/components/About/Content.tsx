import React, { FC } from 'react';
import styled from 'styled-components';

import About from 'features/About';
import { InfoPanel } from 'features/InfoPanel';
import NetworksPreview from 'features/NetworksPreview';
import Carousel from 'features/Carousel';
import { textXX } from 'styles';

const InfoPanelReducer = styled.div`
  margin: 60px 0;
`;

const Reducer = styled.div`
  margin: 0 40px;
`;

const Footer = styled.div.attrs({
  'data-testid': 'about-footer',
})`
  margin-bottom: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.grayscale};
  ${textXX}
`;

const Content: FC = () => (
  <>
    <About />
    <Reducer>
      <InfoPanelReducer>
        <InfoPanel />
      </InfoPanelReducer>
      <NetworksPreview />
    </Reducer>
    <Carousel />
    <Footer>© Tesco.com 2020 All Rights Reserved</Footer>
  </>
);

export default Content;
