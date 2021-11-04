import React, { FC } from 'react';
import { Organization } from '@dni-connectors/colleague-cms-api';
import styled from 'styled-components';
import Link from '@beans/link';
import ResponsiveImage from '@beans/responsive-image';

import Event from 'features/Event';
import { headingSM } from 'styles';
import { useMedia } from 'context/InterfaceContext';
import Carousel from 'features/Carousel';

import NetworkPartnersList from '../Network/NetworkPartnersList';
import NetworkAction from '../NetworkAction';

type Props = {
  email?: string;
  partners?: Organization[];
  id: number;
  onLeave?: () => void;
  onJoin: () => void;
  events: Event[];
  networksIds: number[];
};

const NetworkPartners: FC<Props> = ({ email, partners, id, events, onJoin, onLeave, networksIds }) => {
  const { isMobile, isLargeMobile } = useMedia();
  const isJoined = networksIds.includes(+id);
  const displayPartnersBlock = Boolean(partners && partners.length > 0);

  console.log('partners', partners);
  console.log('displayPartnersBlock', displayPartnersBlock);
  console.log('isMobile', isMobile);
  console.log('isLargeMobile', isLargeMobile);

  if (isMobile || isLargeMobile) {
    return (
      <>
        <LeaveBtnWrapper withMargin={displayPartnersBlock}>
          <NetworkAction {...{ id, onLeave, onJoin, events }} />
        </LeaveBtnWrapper>
        {displayPartnersBlock && (
          <>
            <Title>Network Partnership</Title>
            <Carousel itemWidth='170px' id='partners-carousel'>
              {partners!.map(({ image, id }) => (
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
        )}
      </>
    );
  }

  if (!email && !isJoined && !displayPartnersBlock) return null;

  return (
    <>
      {email && (
        <Item>
          <Title>Get in touch</Title>
          <Link href={`mailto: ${email}`}>{email}</Link>
        </Item>
      )}
      {isJoined && (
        <LeaveBtnWrapper withMargin>
          <NetworkAction {...{ id, onLeave, onJoin, events }} />
        </LeaveBtnWrapper>
      )}
      {displayPartnersBlock && (
        <Item>
          <Title>Network Partnership</Title>
          <NetworkPartnersList partners={partners!} />
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

const LeaveBtnWrapper = styled.div<{ withMargin: boolean }>`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ withMargin }) => withMargin ? '20px' : '0'};
`;

export default NetworkPartners;
