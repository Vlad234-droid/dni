import React, { FC } from 'react';
import ResponsiveImage from '@beans/responsive-image';
import { Organization } from '@dni-connectors/colleague-cms-api';

import styled from 'styled-components';
import Media from 'styles/media';

type Props = {
  partners: Organization[];
};

const NetworkPartnersList: FC<Props> = ({ partners }) => (
  <Wrapper data-testid='network-partners'>
    {partners.map(({ id, image }) => {
      // dont show partner if there is no image for it?
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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 24px;

  ${Media.tablet`
    align-items: flex-end;
    justify-content: flex-end;
    padding-left: 0;
  `}

  div:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export default NetworkPartnersList;
