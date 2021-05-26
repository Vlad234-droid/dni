import React, { FC } from 'react';
import { PromoCarousel } from '@beans/carousel';
import styled from 'styled-components';

import {
  ControlsContainer,
  Controls,
  CarouselControl,
} from '../CarouselControls';

const Wrapper = styled.div`
  position: relative;
`;

PromoCarousel.ControlsContainer = ControlsContainer;
PromoCarousel.Controls = Controls;
PromoCarousel.Control = CarouselControl;

const TEST_ID = 'main-carousel';

type Props = {
  id: string;
  rotationInterval?: number;
  autoPlay?: boolean;
  hideControls?: boolean;
};

const Carousel: FC<Props> = ({
  id,
  rotationInterval = 5000,
  autoPlay = true,
  hideControls = false,
  children,
}) => (
  <Wrapper data-testid={TEST_ID}>
    <PromoCarousel
      {...{
        id,
        rotationInterval,
        autoPlay,
        hideControls,
      }}
    >
      {children}
    </PromoCarousel>
  </Wrapper>
);

export { TEST_ID };

export default Carousel;
