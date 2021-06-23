import React, { FC, useState, useEffect } from 'react';

import { CarouselContent } from 'features/MainCarousel';
import Carousel from 'features/Carousel';

import networks from '../../networks';

const AUTO_SLIDE_INTERVAL = 10000;

const NetworkCarousel: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [swipeHeight, setSwipeHeight] = useState<string>('auto');
  const getChildHeight = (index: number) => document.getElementById(`carousel-content-${index}`)?.clientHeight;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setSwipeHeight(isOpen ? `calc(${getChildHeight(index)}px + 140px)` : 'auto');
  }, [isOpen, index]);

  const handleButtonClick = (index: number) => {
    setIsOpen(!isOpen);
    setIndex(index);
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
      height={swipeHeight}
      fullWidth
      continuous
    >
      {networks.map(({ id, ...network }, index) => (
        <CarouselContent key={id} index={index} onButtonClick={() => handleButtonClick(index)} isOpen={isOpen} {...network} />
      ))}
    </Carousel>
  );
};

export default NetworkCarousel;
