import React, { FC, useState } from 'react';
import Link from '@beans/link';
import Button from '@beans/button';
import Modal from '@beans/modal';

import { useMedia } from 'context/InterfaceContext';
import { CopyLink, TextWithEllipsis } from 'features/Common';
import Event from 'features/Event';
import { PostCreate } from 'features/Post';

import NetworkAction from '../NetworkAction';
import {
  Wrapper,
  TitleWrapper,
  ActionWrapper,
  Actions,
  JoinButtonWrapper,
  ModalContent,
  ModalTitle,
  CopyLinkWrapper,
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
  const [isOpen, setIsOpen] = useState(false);

  const handleShareStory = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => setIsOpen(false);

  return (
    <Wrapper data-testid='network-header' id='network-header'>
      {isOpen && (
        <Modal
          open={isOpen}
          onChange={handleCloseModal}
          id='share-story'
          dynamicHeight
          maxHeight={{ global: '100vh' }}
          modalRootID={'network-header'}
        >
          <ModalContent>
            <ModalTitle>Please, input your story below</ModalTitle>
            <PostCreate networkId={id} onClose={handleCloseModal} />
          </ModalContent>
        </Modal>
      )}
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
            <Button onClick={handleShareStory}>Share story</Button>
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
