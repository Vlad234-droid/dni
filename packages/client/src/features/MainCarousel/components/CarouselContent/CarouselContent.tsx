import React, { FC } from 'react';
import Icon from '@beans/icon';
import Button from '@beans/button';

import {
  Wrapper,
  ContentWrapper,
  Title,
  SubTitle,
  DescriptionWrapper,
  Description,
  Image,
} from './styled';

type Props = {
  isChanged?: boolean;
  title: string;
  subTitle: string;
  subDescription: string;
  description: string;
  image: {
    src: string;
  };
};

const CarouselContent: FC<Props> = ({
  title,
  subTitle,
  subDescription,
  description,
  image: { src },
}) => (
  <Wrapper>
    <ContentWrapper>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
      <DescriptionWrapper>
        <Description>{subDescription}</Description>
        <Description>{description}</Description>
      </DescriptionWrapper>
      <Button inverse variant='primary'>
        Read more
        <Icon graphic='expand' size='xx' />
      </Button>
    </ContentWrapper>
    <Image src={src} />
  </Wrapper>
);

export default CarouselContent;
