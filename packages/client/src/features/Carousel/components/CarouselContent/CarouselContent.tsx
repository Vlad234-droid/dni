import React, { FC } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';

import {
  Wrapper,
  Title,
  SubTitle,
  DescriptionWrapper,
  Description,
  Image,
} from './styled';
import CarouselImage from '../../assets/CarouselImage.png';

const CarouselContent: FC = () => (
  <>
    <Wrapper>
      <Title>Disability at Tesco</Title>
      <SubTitle>Our Purpose:</SubTitle>
      <DescriptionWrapper>
        <Description>
          Helping to inspire and enable all colleagues with disabilities in
          their lives.
        </Description>
        <Description>
          As unique individuals, each of us needs different support to reach our
          full potential. If you have a disability sometimes this can be harder
          and our inclusive approach is designed to ...
        </Description>
      </DescriptionWrapper>
      <Button inverse variant='primary'>
        Read more
        <Icon graphic='expand' size='xx' />
      </Button>
    </Wrapper>
    <Image src={CarouselImage} />
  </>
);

export default CarouselContent;
