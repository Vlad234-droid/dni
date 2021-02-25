import React, { FC } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';

import { Wrapper } from './styled';

// TODO: extract controls to Common?
const ButtonStyles = `
  border: 3px solid var(--button-border-color)};
  width: 81px;
  height: 81px;
`;

const CarouselControls: FC = () => (
  <Wrapper>
    <Button inverse variant='primary' styles={[ButtonStyles]}>
      <Icon graphic='backwardLink' size='xxxl' />
    </Button>
    <Button inverse variant='primary' styles={[ButtonStyles]}>
      <Icon graphic='forwardLink' size='xxxl' />
    </Button>
  </Wrapper>
);

export default CarouselControls;
