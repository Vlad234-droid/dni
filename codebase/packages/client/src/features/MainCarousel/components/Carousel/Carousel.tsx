import React, { FC } from 'react';
import { PromoCarousel } from '@beans/carousel';
import styled from 'styled-components';

import { ControlsContainer, Controls } from '../CarouselControls';

const Wrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.tescoBlue};
`;

const TEST_ID = 'main-carousel';

PromoCarousel.ControlsContainer = ControlsContainer;
PromoCarousel.Controls = Controls;

type Props = {
  id: string;
  rotationInterval?: number;
  autoPlay?: boolean;
  hideControls?: boolean;
  onControlClick?: () => void;
  onChange: () => void;
};

const Carousel: FC<Props> = ({
  id,
  rotationInterval = 10000,
  autoPlay = true,
  hideControls = false,
  children,
  onControlClick,
  onChange,
}) => {
  return (
    <Wrapper data-testid={TEST_ID}>
      <PromoCarousel
        {...{
          id,
          rotationInterval,
          autoPlay: autoPlay,
          hideControls,
          onChange,
          onControlClick,
        }}
      >
        {children}
      </PromoCarousel>
    </Wrapper>
  );
};

export { TEST_ID };

export default Carousel;
