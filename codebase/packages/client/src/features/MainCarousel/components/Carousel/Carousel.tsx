import React, { FC, useState } from 'react';
import { PromoCarousel } from '@beans/carousel';
import styled from 'styled-components';

import { ControlsContainer, Controls } from '../CarouselControls';

const Wrapper = styled.div`
  position: relative;
`;

const TEST_ID = 'main-carousel';

PromoCarousel.ControlsContainer = ControlsContainer;
PromoCarousel.Controls = Controls;

type Props = {
  id: string;
  rotationInterval?: number;
  autoPlay?: boolean;
  hideControls?: boolean;
};

const Carousel: FC<Props> = ({ id, rotationInterval = 5000, autoPlay = true, hideControls = false, children }) => {
  const [play, setPlay] = useState(autoPlay);
  const onChange = () => setPlay(!play);

  return (
    <Wrapper data-testid={TEST_ID}>
      <PromoCarousel
        {...{
          id,
          rotationInterval,
          autoPlay: play,
          hideControls,
          onChange,
        }}
      >
        {children}
      </PromoCarousel>
    </Wrapper>
  );
};

export { TEST_ID };

export default Carousel;
