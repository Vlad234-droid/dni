import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';

import { useMedia } from 'context/InterfaceContext';
import { CarouselContent } from 'features/MainCarousel';
import Carousel from 'features/Carousel';

import networks from '../../config/networks-data';

const AUTO_SLIDE_INTERVAL = 10000;
const MOBILE_ADDITION = 140;

const NetworkCarousel: FC = () => {
  const { isMobile, isLargeMobile } = useMedia();
  const [isOpen, setIsOpen] = useState(false);
  const [swipeHeight, setSwipeHeight] = useState<string>('auto');
  const getChildHeight = (index: number) => {
    const elHeight = document.getElementById(`carousel-content-${index}`)?.clientHeight;

    if (isMobile || isLargeMobile) {
      return elHeight! + MOBILE_ADDITION;
    }

    return elHeight;
  };
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setSwipeHeight(isOpen ? `${getChildHeight(index)}px` : 'auto');
  }, [isOpen, index]);

  const handleButtonClick = (index: number) => {
    setIsOpen(!isOpen);
    setIndex(index);
  };

    const handleOnChange = () => {
    setIsOpen(false);
  }

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .swipe-item {
    display: block;
  }
`;

export default NetworkCarousel;
