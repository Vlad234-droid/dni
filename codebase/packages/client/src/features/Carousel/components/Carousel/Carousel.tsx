import React, {FC, useRef, Children, useCallback, useEffect} from 'react';
import Swipe, { SwipeItem, SwipeInstance } from 'swipejs/react';
import { ContentCarousel } from '@beans/carousel';

import { useMedia } from 'context/InterfaceContext';

import { AUTO_SLIDE_INTERVAL, TRANSITION_SPEED } from '../../config';
import ActiveItemControl from '../ActiveItemControl';
import { SwipeWrapper, ActiveItemControlContainer, CarouselWrapper } from './styled';

type Props = {
  id: string;
  itemWidth?: string;
  itemName?: string;
  fullWidth?: boolean;
  continuous?: boolean;
  onChange?: () => void;
  isOpen?: boolean;
};

const Carousel: FC<Props> = ({
  children,
  itemName = 'item',
  itemWidth = 'auto',
  fullWidth = false,
  continuous = false,
  onChange,
  isOpen = false,
  ...rest
}) => {
  const { isMobile } = useMedia();
  const swipe = useRef<SwipeInstance>(null);
  const [activeIndex, syncActiveIndex] = React.useState(0);
  const childCount = React.Children.count(children);

  useEffect(() => {
    if (isOpen) {
      // @ts-ignore
      swipe && swipe.current && swipe.current.instance && swipe.current.instance.stop();
    } else {
      // @ts-ignore
      swipe && swipe.current && swipe.current.instance && swipe.current.instance.enable();
    }
  }, [isOpen]);

  const handleSwipe = useCallback(
    (index) => {
      syncActiveIndex(index);
      onChange && onChange();
    },
    [activeIndex],
  );

  if (fullWidth || isMobile) {
    return (
      <SwipeWrapper data-testid='carousel'>
        <Swipe
          auto={AUTO_SLIDE_INTERVAL}
          callback={handleSwipe}
          speed={TRANSITION_SPEED}
          continuous={continuous}
          ref={swipe}
        >
          {Children.map(children, (child, index) => (
            <SwipeItem key={index}>{child}</SwipeItem>
          ))}
        </Swipe>
        {childCount > 1 && (
          <ActiveItemControlContainer>
            <ActiveItemControl
              itemsCount={childCount}
              activeItem={activeIndex}
              next={swipe?.current?.instance?.next}
              prev={swipe?.current?.instance?.prev}
            />
          </ActiveItemControlContainer>
        )}
      </SwipeWrapper>
    );
  }

  return (
    <CarouselWrapper data-testid='carousel' hideControls={childCount < 4}>
      <ContentCarousel {...rest} itemName={itemName} itemWidth={itemWidth}>
        {children}
      </ContentCarousel>
    </CarouselWrapper>
  );
};

export default Carousel;
