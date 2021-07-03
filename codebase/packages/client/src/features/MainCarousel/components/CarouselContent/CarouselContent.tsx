import React, { FC } from 'react';

import { Wrapper, ContentWrapper, Title, DescriptionWrapper, Description, Image } from './styled';

type Props = {
  isChanged?: boolean;
  title: string;
  description: string | string[];
  image: {
    src: string;
  };
  index: number;
};

const CarouselContent: FC<Props> = ({ index, title, description, image: { src } }) => (
  <Wrapper>
    <ContentWrapper id={`carousel-content-${index}`}>
      <Title>{title}</Title>
      <DescriptionWrapper>
        <Description isOpen={true}>
          {Array.isArray(description) ? (
            description.map((item, index) => <p key={index}>{item}</p>)
          ) : (
            <p>{description}</p>
          )}
        </Description>
      </DescriptionWrapper>
    </ContentWrapper>
    <Image src={src} isOpen={true} />
  </Wrapper>
);

export default CarouselContent;
