import React, { FC } from 'react';
import Link from '@beans/link';

import { useMedia } from 'context/InterfaceContext';
import { CopyLink, TextWithEllipsis } from 'features/Common';
import Event from 'features/Event';
import { ShareStoryButton } from 'features/GlobalModal';

import NetworkAction from '../NetworkAction';
import {
  Wrapper,
  TitleWrapper,
  ActionWrapper,
  Actions,
  JoinButtonWrapper,
  CopyLinkWrapper,
  ShareStoryBtnWrapper,
} from './styled';

type Props = {
  id: number;
  title: string;
  email: string;
  onLeave: () => void;
  onJoin: () => void;
  events: Event[];
  networks: number[];
  slug: string;
};

const NetworkHeader: FC<Props> = ({ id, title, email, onLeave, onJoin, events, networks, slug }) => {
  const { isMobile, isLargeMobile } = useMedia();
  const isMobileView = isMobile || isLargeMobile;
  const isJoined = networks.includes(+id);

  return (
    <Wrapper data-testid='network-header' id='network-header'>
      <TitleWrapper>
        <TextWithEllipsis tooltipPosition={{ left: '24px', top: '86px' }}>{title}</TextWithEllipsis>
        {isMobileView && <CopyLink />}
      </TitleWrapper>
      <ActionWrapper>
        {isMobileView && <Link href={`mailto: ${email}`}>{email}</Link>}
        <Actions>
          {!isMobileView && (
            <CopyLinkWrapper>
              <CopyLink />
            </CopyLinkWrapper>
          )}
          <div>
            <ShareStoryBtnWrapper>
              <ShareStoryButton id={id} block={isMobile || isLargeMobile} />
            </ShareStoryBtnWrapper>
            {!isJoined && (
              <JoinButtonWrapper>
                <NetworkAction {...{ id, onLeave, onJoin, events }} />
              </JoinButtonWrapper>
            )}
          </div>
        </Actions>
      </ActionWrapper>
    </Wrapper>
  );
};

export default NetworkHeader;
