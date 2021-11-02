import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { CarouselContent } from 'features/MainCarousel';
import Carousel from 'features/Carousel';

import networks from '../../config/networks-data';

const AUTO_SLIDE_INTERVAL = 10000;

const NetworkCarousel: FC = () => (
  <Wrapper>
    <Carousel
      id='networks-preview-carousel'
      interval={AUTO_SLIDE_INTERVAL}
      fullWidth
      continuous
    >
      {networks.map(({ id, ...network }) => (
        <CarouselContent key={id} {...network} />
      ))}
    </Carousel>
  </Wrapper>
);

const Wrapper = styled.div`
  .swipe-item {
    display: block;
  }
`;

export default NetworkCarousel;
