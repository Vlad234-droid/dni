import React, { FC } from 'react';
import Icon from '@beans/icon';
import Button from '@beans/button';

import {
  Wrapper,
  ContentWrapper,
  Title,
  DescriptionWrapper,
  Description,
  Image,
} from './styled';

type Props = {
  isChanged?: boolean;
  title: string;
  description: string | string[];
  image: {
    src: string;
  };
};

const CarouselContent: FC<Props> = ({ title, description, image: { src } }) => (
  <Wrapper>
    <ContentWrapper>
      <Title>{title}</Title>
      <DescriptionWrapper>
        <Description>
          {Array.isArray(description) ? (
            description.map((item, index) => <p key={index}>{item}</p>)
          ) : (
            <p>{description}</p>
          )}
        </Description>
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
