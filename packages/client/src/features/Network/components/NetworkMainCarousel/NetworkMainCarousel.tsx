import React, { FC, useState } from 'react';

import MainCarousel, { CarouselContent } from 'features/MainCarousel';

import networks from '../../networks';

const NetworkCarousel: FC = () => {
  return (
    <MainCarousel id='networks-preview-carousel' hideControls={false} autoPlay>
      {networks.map(({ id, ...network }) => (
        <CarouselContent key={id} {...network} />
      ))}
    </MainCarousel>
  );
};

export default NetworkCarousel;
