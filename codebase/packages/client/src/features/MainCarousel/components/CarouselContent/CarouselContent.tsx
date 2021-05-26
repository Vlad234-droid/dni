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
  onClick: () => void;
  isOpen: boolean;
};

const CarouselContent: FC<Props> = ({
  title,
  description,
  image: { src },
  onClick,
  isOpen,
}) => (
  <Wrapper>
    <ContentWrapper>
      <Title>{title}</Title>
      <DescriptionWrapper>
        <Description isOpen={isOpen}>
          {Array.isArray(description) ? (
            description.map((item, index) => <p key={index}>{item}</p>)
          ) : (
            <p>{description}</p>
          )}
        </Description>
      </DescriptionWrapper>
      <Button inverse variant='primary' onClick={onClick}>
        {isOpen ? 'Read less' : 'Read more'}
        <Icon graphic={isOpen ? 'contract' : 'expand'} size='xx' />
      </Button>
    </ContentWrapper>
    <Image src={src} />
  </Wrapper>
);

export default CarouselContent;
