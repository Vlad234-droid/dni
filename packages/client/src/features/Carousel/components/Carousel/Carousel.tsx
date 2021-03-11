import React, { FC } from 'react';
import { ContentCarousel } from '@beans/carousel';
import { Wrapper } from './styled';

type Props = {
  id: string;
  itemWidth: string;
  itemName?: string;
};

const Carousel: FC<Props> = ({ children, itemName = 'item', ...rest }) => (
  <Wrapper data-testid='carousel'>
    <ContentCarousel {...rest} itemName={itemName}>
      {children}
    </ContentCarousel>
  </Wrapper>
);

export default Carousel;
