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
  onButtonClick: () => void;
  isOpen: boolean;
};

const CarouselContent: FC<Props> = ({
  title,
  description,
  image: { src },
  onButtonClick,
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
      <Button inverse variant='primary' onClick={onButtonClick}>
        {isOpen ? 'Read less' : 'Read more'}
        <Icon graphic={isOpen ? 'contract' : 'expand'} size='xx' />
      </Button>
    </ContentWrapper>
    <Image src={src} isOpen={isOpen} />
  </Wrapper>
);

export default CarouselContent;
