import React, { FC } from 'react';
import Icon from '@beans/icon';
import Link from '@beans/link';

import { Wrapper, IconWrapper, Content, Title } from './styled';

// TODO: spread component on InfoPanel and its content parts, when get more info about InfoPanels
const InfoPanel: FC = () => (
  <Wrapper>
    <IconWrapper>
      <Icon graphic='lists' size='xxxl' />
    </IconWrapper>
    <Content>
      <Title>Please, fill quick “this is me” survey</Title>
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

export default InfoPanel;
