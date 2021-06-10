import React, { FC } from 'react';
import styled from 'styled-components';
import Link from '@beans/link';

import { redDot } from 'styles';
import Media from 'styles/media';
import { useMedia } from 'context/InterfaceContext';
import { CopyLink, TextWithEllipsis } from 'features/Common';

import NetworkAction from '../NetworkAction';

type Props = {
  id: number;
  title: string;
  email: string;
  onLeave: () => void;
  onJoin: () => void;
};

const NetworkHeader: FC<Props> = ({ id, title, email, onLeave, onJoin }) => {
  const { isMobile } = useMedia();

  // TODO: use commented code to display network actions edit and archive
  return (
    <Wrapper>
      <TitleWrapper>
        <TextWithEllipsis>{title}</TextWithEllipsis>
        {isMobile && <CopyLink />}
      </TitleWrapper>
      {isMobile && <Link href={`mailto: ${email}`}>{email}</Link>}
      <Actions>
        {!isMobile && <CopyLink />}
        <ButtonWrapper>
          <NetworkAction {...{ id, onLeave, onJoin }} />
        </ButtonWrapper>
      </Actions>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  padding: 24px 16px;

  ${Media.tablet`
    display: flex;
    justify-content: space-between;
    padding: 24px;
  `}
`;

export const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 76px;
  left: 16px;
  right: 16px;
  z-index: 100;

  & > button {
    width: 100%;
  }

  ${Media.tablet`
     position: static;
  `}
`;

export const TitleWrapper = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0 0 22px;
  color: ${({ theme }) => theme.colors.tescoBlue};

  ${Media.tablet`
     padding: 0;
  `}

  h5 {
    font-weight: bold;
    font-size: 32px;
    line-height: 45px;
    margin-right: 0;

    ${Media.tablet`
      margin-right: 24px;
      font-size: 50px;
      line-height: 71px;
    `}

    &::after {
      ${redDot};
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & button:not(:last-child) {
    margin-right: 16px;
  }
`;

export default NetworkHeader;
