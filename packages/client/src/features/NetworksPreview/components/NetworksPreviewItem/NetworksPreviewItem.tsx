import React, { FC } from 'react';

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
}) => (
  <Wrapper>
    <ImageWrapper>
      <Image src={imageSrc} />
    </ImageWrapper>
    <Title>{title}</Title>
    <Description>{description}</Description>
  </Wrapper>
);

export default NetworksPreviewItem;
