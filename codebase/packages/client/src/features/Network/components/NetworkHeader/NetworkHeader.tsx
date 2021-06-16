import React, { FC } from 'react';
import Link from '@beans/link';

import { useMedia } from 'context/InterfaceContext';
import { CopyLink, TextWithEllipsis } from 'features/Common';
import Event from 'features/Event';
import useStore from 'hooks/useStore';

import NetworkAction from '../NetworkAction';
import { Wrapper, TitleWrapper, ActionWrapper, Actions, ButtonWrapper } from './styled';

type Props = {
  id: number;
  title: string;
  email: string;
  onLeave: () => void;
  onJoin: () => void;
  events: Event[];
};

const NetworkHeader: FC<Props> = ({ id, title, email, onLeave, onJoin, events }) => {
  const { networks = [] } = useStore((state) => state.auth.user);
  const isJoined = networks.includes(+id);
  const { isMobile, isLargeMobile } = useMedia();
  const isMobileView = isMobile || isLargeMobile;

  return (
    <Wrapper>
      <TitleWrapper>
        <TextWithEllipsis tooltipPosition={{ left: '24px', top: '86px' }}>{title}</TextWithEllipsis>
        {isMobileView && <CopyLink />}
      </TitleWrapper>
      <ActionWrapper>
        {isMobileView && <Link href={`mailto: ${email}`}>{email}</Link>}
        <Actions>
          {!isMobileView && <CopyLink />}
          <ButtonWrapper isJoined={isJoined}>
            <NetworkAction {...{ id, onLeave, onJoin, events }} />
          </ButtonWrapper>
        </Actions>
      </ActionWrapper>
    </Wrapper>
  );
};

export default NetworkHeader;
