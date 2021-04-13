import React, { FC } from 'react';
import styled from 'styled-components';
import { TitleWithEllipsis } from '@beans/title-link';
import Link from '@beans/link';
import Button from '@beans/button';

import Media from 'styles/media';
import { useMedia } from 'context/InterfaceContext';
import { headingMD } from 'styles';

type Props = {
  title: string;
  email: string;
  isJoined: boolean;
  onLeave: () => void;
  onJoin: () => void;
};

const NetworkHeader: FC<Props> = ({
  title,
  email,
  isJoined,
  onLeave,
  onJoin,
}) => {
  const { isMobile } = useMedia();

  // TODO: use commented code to display network actions edit and archive
  return (
    <Wrapper>
      <TitleWrapper>
        <div>
          <TitleWithEllipsis
            maxLines={1}
            titleHeight={isMobile ? '28px' : '45px'}
          >
            {title}
          </TitleWithEllipsis>
          {isMobile && <Link href={`mailto: ${email}`}>{email}</Link>}
        </div>
        <ButtonWrapper>
          {isJoined ? (
            <Button variant='primary' onClick={onLeave} size='xxl'>
              Leave
            </Button>
          ) : (
            <Button variant='primary' onClick={onJoin}>
              Join
            </Button>
          )}
        </ButtonWrapper>
      </TitleWrapper>
      {/*<Actions>*/}
      {/*  <IconWrapper>*/}
      {/*    <Button variant='link'>*/}
      {/*      <Icon graphic='edit' />*/}
      {/*    </Button>*/}
      {/*  </IconWrapper>*/}
      {/*  <IconWrapper>*/}
      {/*    <Button variant='link'>*/}
      {/*      <Icon graphic='archive' />*/}
      {/*    </Button>*/}
      {/*  </IconWrapper>*/}
      {/*</Actions>*/}
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px 16px;

  ${Media.tablet`
     padding: 24px;
  `}
`;

// TODO: use commented code to display network actions edit and archive
// const Actions = styled.div`
//   display: flex;
//
//   & div:not(:last-child) {
//     margin-right: 8px;
//   }
// `;

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
  display: flex;

  h3 {
    margin-right: 24px;
    margin-bottom: 4px;
    ${headingMD};

    ${Media.tablet`
      font-size: 32px;
      line-height: 45px;
      margin-bottom: 0;
    `}
  }
`;

export default NetworkHeader;
