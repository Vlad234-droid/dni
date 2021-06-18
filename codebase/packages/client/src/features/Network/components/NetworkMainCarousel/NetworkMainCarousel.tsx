import React, { FC, useState } from 'react';

import MainCarousel, { CarouselContent } from 'features/MainCarousel';

import networks from '../../networks';

const NetworkCarousel: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [play, setPlay] = useState(true);
  const [forcePlay, setForcePlay] = useState(!isOpen);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    !isOpen && setForcePlay(false);
    isOpen && setForcePlay(true);
  };

  const handleControlClick = () => {
    isOpen && setIsOpen(false);
  };

  const handlePlayClick = () => {
    setPlay(!play);
  };

  return (
    <MainCarousel
      id='networks-preview-carousel'
      hideControls={false}
      autoPlay={isOpen ? forcePlay : play}
      onChange={handlePlayClick}
      onControlClick={handleControlClick}
    >
      {networks.map(({ id, ...network }) => (
        <CarouselContent key={id} onButtonClick={handleButtonClick} isOpen={isOpen} {...network} />
      ))}
    </MainCarousel>
  );
};

export default NetworkCarousel;
