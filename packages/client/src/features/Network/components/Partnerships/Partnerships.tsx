import React, { FC } from 'react';
import ResponsiveImage from '@beans/responsive-image';
import { Organization } from '@dni-connectors/colleague-cms-api';

import { normalizeImage } from 'utils/content';

import { Wrapper } from './styled';

type Props = {
  partnerships: Organization[];
};

const Partnerships: FC<Props> = ({ partnerships }) => (
  <Wrapper>
    {partnerships.map(({ id, image }) => {
      const normalizedImage = normalizeImage(image);

      if (!normalizedImage) return null;

      return (
        <div key={id}>
          <ResponsiveImage
            alt={normalizedImage.alternativeText}
            src={normalizedImage.url}
            fallbackSizeRatio='57%'
            maxWidth='170px'
            objectFit='contain'
          />
        </div>
      );
    })}
  </Wrapper>
);

export default Partnerships;
