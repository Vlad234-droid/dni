import React, { FC } from 'react';
import Icon from '@beans/icon';

import { useMedia } from 'context/InterfaceContext';

import { Wrapper, ImageWrapper, Image, Title, Description } from './styled';

interface Network {
  id: string;
  imageSrc: string;
  title: string;
  description: Array<string>;
}

type Props = {
  network: Network;
};

const NetworksPreviewItem: FC<Props> = ({
  network: { imageSrc, title, description },
}) => {
  const { isMobile } = useMedia();

  return (
    <Wrapper>
      <ImageWrapper>
        {isMobile ? (
          <Icon graphic='leaf' size='sm' stroke='#fff' fill='#0054A4' />
        ) : (
          <Image src={imageSrc} />
        )}
      </ImageWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Wrapper>
  );
};

export default NetworksPreviewItem;
