import React, { FC } from 'react';
import Icon from '@beans/icon';
import Link from '@beans/link';
import { Footnote } from '@beans/typography';

import { useMedia } from 'context/InterfaceContext';

import data from '../../config/data';
import {
  Wrapper,
  IconWrapper,
  Content,
  Title,
  Description,
  FootnoteWrapper,
} from './styled';

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
        <Title>{data.title}</Title>
        <Description>
          {data.description.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </Description>
        <FootnoteWrapper>
          <Footnote>
            <p>{data.footnote.title}</p>
            <Link href={data.footnote.link}>{data.footnote.linkText}</Link>
          </Footnote>
        </FootnoteWrapper>
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
