import React, { FC, useState } from 'react';

import MainCarousel, { CarouselContent } from 'features/MainCarousel';

import networks from '../../networks';

const NetworkCarousel: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [play, setPlay] = useState(!isOpen);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handlePlayClick = () => setPlay(!play);

  return (
    <MainCarousel
      id='networks-preview-carousel'
      hideControls={false}
      autoPlay={play}
      onChange={handlePlayClick}
    >
      {networks.map(({ id, ...network }) => (
        <CarouselContent key={id} onButtonClick={handleButtonClick} isOpen={isOpen} {...network} />
      ))}
    </MainCarousel>
  );
};

export default NetworkCarousel;
