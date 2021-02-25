import React, { FC } from 'react';
import styled from 'styled-components';

import CarouselControls from '../CarouselControls';
import CarouselContent from '../CarouselContent';

const Wrapper = styled.div.attrs({
  'data-testid': 'carousel',
})`
  position: relative;
  margin: 132px 0 58px;
  background-color: ${({ theme }) => theme.colors.tescoBlue};
  height: 476px;
  display: flex;
  justify-content: space-between;
`;

const Carousel: FC = () => (
  <Wrapper>
    <CarouselContent />
    <CarouselControls />
  </Wrapper>
);

export default Carousel;
