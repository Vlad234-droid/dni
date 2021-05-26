import React, { FC, useState } from 'react';

import { useMedia } from 'context/InterfaceContext';
import MainCarousel, { CarouselContent } from 'features/MainCarousel';

import networks from '../../networks';

const NetworkCarousel: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);
  const { isMobile } = useMedia();

  return (
    <MainCarousel
      id='networks-preview-carousel'
      hideControls={isMobile}
      autoPlay={!isOpen}
    >
      {networks.map(({ id, ...network }) => (
        <CarouselContent
          key={id}
          onClick={handleClick}
          isOpen={isOpen}
          {...network}
        />
      ))}
    </MainCarousel>
  );
};

export default NetworkCarousel;
