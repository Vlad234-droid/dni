import React, { FC, useState } from 'react';

import MainCarousel, { CarouselContent } from 'features/MainCarousel';

import networks from '../../networks';

const NetworkCarousel: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  return (
    <MainCarousel
      id='networks-preview-carousel'
      hideControls={false}
      autoPlay={true}
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
