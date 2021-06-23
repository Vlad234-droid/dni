import React, { FC, useState } from 'react';

import { CarouselContent } from 'features/MainCarousel';
import Carousel from 'features/Carousel';

import networks from '../../networks';

const AUTO_SLIDE_INTERVAL = 10000;

const NetworkCarousel: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOnChange = () => {
    setIsOpen(false);
  }

  return (
    <Carousel
      id='networks-preview-carousel'
      isOpen={isOpen}
      onChange={handleOnChange}
      interval={AUTO_SLIDE_INTERVAL}
      fullWidth
      continuous
    >
      {networks.map(({ id, ...network }) => (
        <CarouselContent key={id} onButtonClick={handleButtonClick} isOpen={isOpen} {...network} />
      ))}
    </Carousel>
  );
};

export default NetworkCarousel;
