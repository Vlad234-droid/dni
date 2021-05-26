import React, { FC } from 'react';
import { Organization } from '@dni-connectors/colleague-cms-api';
import styled from 'styled-components';
import Link from '@beans/link';
import ResponsiveImage from '@beans/responsive-image';

import { headingSM } from 'styles';
import { useMedia } from 'context/InterfaceContext';
import Carousel from 'features/Carousel';

import NetworkPartnersList from './NetworkPartnersList';

type Props = {
  email: string;
  partners: Organization[];
};

const NetworkPartners: FC<Props> = ({ email, partners }) => {
  const { isMobile } = useMedia();

  if (isMobile) {
    return (
      <>
        <Title>Network Partnership</Title>
        <Carousel itemWidth='170px' id='partners-carousel'>
          {partners.map(({ image, id }) => (
            <ResponsiveImage
              key={id}
              alt={image?.alternativeText}
              src={image?.url}
              fallbackSizeRatio='57%'
              maxWidth='170px'
              objectFit='contain'
            />
          ))}
        </Carousel>
      </>
    );
  }

  return (
    <>
      <Item>
        <Title>Get in touch</Title>
        <Link href={`mailto: ${email}`}>{email}</Link>
      </Item>
      <Item>
        <Title>Network Partnership</Title>
        <NetworkPartnersList partners={partners} />
      </Item>
    </>
  );
};

const Item = styled.div`
  &:not(:last-child) {
    margin-bottom: 40px;
  }
`;

const Title = styled.h5`
  ${headingSM};
  margin-bottom: 14px;
`;

export default NetworkPartners;
