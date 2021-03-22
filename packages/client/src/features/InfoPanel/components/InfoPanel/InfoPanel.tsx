import React, { FC } from 'react';
import Icon from '@beans/icon';
import Link from '@beans/link';

import { useMedia } from 'context/InterfaceContext';

import { Wrapper, IconWrapper, Content, Title, Description } from './styled';

// TODO: spread component on InfoPanel and its content parts, when get more info about InfoPanels
const InfoPanel: FC = () => {
  const { isMobile } = useMedia();
  const iconSize = isMobile ? 'xl' : 'xxxl';

  return (
    <Wrapper>
      <IconWrapper>
        <Icon graphic='lists' size={iconSize} />
      </IconWrapper>
      <Content>
        <Title>Please, fill “This is Me” survey</Title>
        <Description>
          Having better data around the diversity of our colleagues give us a
          greater insight into where we need to focus our attention to make
          Tesco a place where everyone is welcome.
        </Description>
        <Link
          href={'/'}
          icon={{ graphic: 'externalLink', position: { global: 'right' } }}
          variant='textButton'
        >
          Fill the survey
        </Link>
      </Content>
    </Wrapper>
  );
};

export default InfoPanel;
