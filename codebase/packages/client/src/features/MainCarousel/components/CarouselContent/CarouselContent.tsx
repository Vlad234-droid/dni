import React, { FC } from 'react';
import Icon from '@beans/icon';
import Button from '@beans/button';

import { useMedia } from 'context/InterfaceContext';
import { Wrapper, ContentWrapper, Title, DescriptionWrapper, Description, Image } from './styled';

type Props = {
  isChanged?: boolean;
  title: string;
  description: string | string[];
  image: {
    src: string;
  };
  onButtonClick: () => void;
  isOpen: boolean;
  index: number;
};

const CarouselContent: FC<Props> = ({ index, title, description, image: { src }, onButtonClick, isOpen }) => {
  const { isMobile, isLargeMobile, isTablet, isDesktop } = useMedia();
  const showReadMore = isMobile || isLargeMobile || isTablet;
  const adjustedIsOpen = showReadMore ? isOpen : true;

  console.log(`isMobile: ${isMobile}, isLargeMobile: ${isLargeMobile}, isTablet: ${isTablet}, isDesktop: ${isDesktop}`);

  return (
    <Wrapper>
      <ContentWrapper id={`carousel-content-${index}`}>
        <Title>{title}</Title>
        <DescriptionWrapper>
          <Description isOpen={adjustedIsOpen}>
            {Array.isArray(description) ? (
              description.map((item, index) => <p key={index}>{item}</p>)
            ) : (
              <p>{description}</p>
            )}
          </Description>
        </DescriptionWrapper>
        { showReadMore &&
        <Button inverse variant='primary' onClick={onButtonClick}>
          {adjustedIsOpen ? 'Read less' : 'Read more'}
          <Icon graphic={adjustedIsOpen ? 'contract' : 'expand'} size='xx' />
        </Button>
        }
      </ContentWrapper>
      <Image src={src} isOpen={adjustedIsOpen} />
    </Wrapper>
  );
}

export default CarouselContent;
