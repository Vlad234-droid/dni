import React, { FC } from 'react';
import { Organization } from '@dni-connectors/colleague-cms-api';
import styled from 'styled-components';
import Link from '@beans/link';
import ResponsiveImage from '@beans/responsive-image';

import Event from 'features/Event';
import { headingSM } from 'styles';
import { useMedia } from 'context/InterfaceContext';
import Carousel from 'features/Carousel';
import useStore from 'hooks/useStore';

import NetworkPartnersList from './NetworkPartnersList';
import NetworkAction from '../NetworkAction';

type Props = {
  email?: string;
  partners?: Organization[];
  id: number;
  onLeave?: () => void;
  onJoin: () => void;
  events: Event[];
};

const NetworkPartners: FC<Props> = ({ email, partners, id, events, onJoin, onLeave }) => {
  const { isMobile, isLargeMobile } = useMedia();
  const { networks = [] } = useStore((state) => state.auth.user);
  const isJoined = networks.includes(+id);

  if (partners && (isMobile || isLargeMobile)) {
    return (
      <>
        <LeaveBtnWrapper>
          <NetworkAction {...{ id, onLeave, onJoin, events }} />
        </LeaveBtnWrapper>
        <Title>Network Partnership</Title>
        <Carousel itemWidth='170px' id='partners-carousel'>
          {partners.map(({ image, id }) => (
            <ResponsiveImage
              key={id}
              alt={image?.alternativeText}
              title={image?.alternativeText}
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
      {email && (
        <Item>
          <Title>Get in touch</Title>
          <Link href={`mailto: ${email}`}>{email}</Link>
        </Item>
      )}
      {isJoined && (
        <LeaveBtnWrapper>
          <NetworkAction {...{ id, onLeave, onJoin, events }} />
        </LeaveBtnWrapper>
      )}
      {partners && (
        <Item>
          <Title>Network Partnership</Title>
          <NetworkPartnersList partners={partners} />
        </Item>
      )}
    </>
  );
};

const Item = styled.div`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const Title = styled.h5`
  ${headingSM};
  margin-bottom: 14px;
`;

const LeaveBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export default NetworkPartners;
