import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';

import { CarouselContent } from 'features/MainCarousel';
import Carousel from 'features/Carousel';

import networks from '../../networks';

const AUTO_SLIDE_INTERVAL = 10000;

const NetworkCarousel: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [swipeHeight, setSwipeHeight] = useState(0);
  const getChildHeight = (index: number) => document.getElementById(`carousel-content-${index}`)?.clientHeight || 0;
  const height = isOpen ? `${swipeHeight}px` : 'auto';
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isOpen)
    setSwipeHeight(getChildHeight(index));
  }, [isOpen]);

  const handleButtonClick = (index: number) => {
    setIsOpen(!isOpen);
    setIndex(index);
  };

  const handleOnChange = () => {
    setIsOpen(false);
  }

  console.log('swipeHeight', swipeHeight);

  return (
    <Wrapper>
      <Carousel
        id='networks-preview-carousel'
        isOpen={isOpen}
        onChange={handleOnChange}
        interval={AUTO_SLIDE_INTERVAL}
        height={height}
        fullWidth
        continuous
      >
        {networks.map(({ id, ...network }, index) => (
          <CarouselContent key={id} index={index} onButtonClick={() => handleButtonClick(index)} isOpen={isOpen} {...network} />
        ))}
      </Carousel>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .swipe-item {
    display: block;
  }
`;

export default NetworkCarousel;
