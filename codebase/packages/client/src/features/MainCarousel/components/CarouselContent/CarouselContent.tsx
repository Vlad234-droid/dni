import React, { FC  } from 'react';

import { Wrapper, ContentWrapper, Title, DescriptionWrapper, Description, Image } from './styled';

type Props = {
  title: string;
  description: string;
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
          <p>{description}</p>
        </Description>
      </DescriptionWrapper>
    </ContentWrapper>
    <Image src={src} />
  </Wrapper>
);

export default CarouselContent;
