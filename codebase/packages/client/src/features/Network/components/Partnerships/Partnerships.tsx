import React, { FC } from 'react';
import ResponsiveImage from '@beans/responsive-image';
import { Organization } from '@dni-connectors/colleague-cms-api';

import { Wrapper } from './styled';

type Props = {
  partnerships: Organization[];
};

const Partnerships: FC<Props> = ({ partnerships }) => (
  <Wrapper>
    {partnerships.map(({ id, image }) => {
      if (!image) return null;

      return (
        <div key={id}>
          <ResponsiveImage
            alt={image.alternativeText}
            title={image.alternativeText}
            src={image.url}
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
