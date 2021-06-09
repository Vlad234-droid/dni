import React, { FC, useState } from 'react';

import Carousel from 'features/Carousel';
import CarouselContent from './CarouselContent';

import networks from '../../networks';

const NetworkCarousel: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  return (
    <Carousel id='networks-preview-carousel' fullWidth continuous>
      {networks.map(({ id, ...network }) => (
        <CarouselContent
          key={id}
          onClick={handleClick}
          isOpen={isOpen}
          {...network}
        />
      ))}
    </Carousel>
  );
};

export default NetworkCarousel;
