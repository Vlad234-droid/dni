import React, { FC } from 'react';
import Link from '@beans/link';

import { useMedia } from 'context/InterfaceContext';
import { CopyLink, TextWithEllipsis } from 'features/Common';

import NetworkAction from '../NetworkAction';
import { Wrapper, TitleWrapper, Actions, ButtonWrapper } from './styled';

type Props = {
  id: number;
  title: string;
  email: string;
  onLeave: () => void;
  onJoin: () => void;
};

const NetworkHeader: FC<Props> = ({ id, title, email, onLeave, onJoin }) => {
  const { isMobile, isLargeMobile } = useMedia();
  const isMobileView = isMobile || isLargeMobile;
  const asidePadding = isMobile ? '16px' : '24px';
  const titleHeight = isMobile ? '45px' : '71px';

  // TODO: use commented code to display network actions edit and archive
  return (
    <Wrapper asidePadding={asidePadding}>
      <TitleWrapper height={titleHeight}>
        <TextWithEllipsis left={asidePadding} top={titleHeight}>
          {title}
        </TextWithEllipsis>
        {isMobileView && <CopyLink />}
      </TitleWrapper>
      {isMobileView && <Link href={`mailto: ${email}`}>{email}</Link>}
      <Actions>
        {!isMobileView && <CopyLink />}
        <ButtonWrapper>
          <NetworkAction {...{ id, onLeave, onJoin }} />
        </ButtonWrapper>
      </Actions>
    </Wrapper>
  );
};

export default NetworkHeader;
