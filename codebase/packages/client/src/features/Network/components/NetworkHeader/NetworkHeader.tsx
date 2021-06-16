import React, { FC } from 'react';
import Link from '@beans/link';

import { useMedia } from 'context/InterfaceContext';
import { CopyLink, TextWithEllipsis } from 'features/Common';
import Event from 'features/Event';

import NetworkAction from '../NetworkAction';
import { Wrapper, TitleWrapper, Actions, ButtonWrapper } from './styled';

type Props = {
  id: number;
  title: string;
  email: string;
  onLeave: () => void;
  onJoin: () => void;
  events: Event[];
};

const NetworkHeader: FC<Props> = ({ id, title, email, onLeave, onJoin, events }) => {
  const { isMobile, isLargeMobile } = useMedia();
  const isMobileView = isMobile || isLargeMobile;

  return (
    <Wrapper>
      <TitleWrapper>
        <TextWithEllipsis tooltipPosition={{ left: '24px', top: '86px' }}>{title}</TextWithEllipsis>
        {isMobileView && <CopyLink />}
      </TitleWrapper>
      {isMobileView && <Link href={`mailto: ${email}`}>{email}</Link>}
      <Actions>
        {!isMobileView && <CopyLink />}
        <ButtonWrapper>
          <NetworkAction {...{ id, onLeave, onJoin, events }} />
        </ButtonWrapper>
      </Actions>
    </Wrapper>
  );
};

export default NetworkHeader;
