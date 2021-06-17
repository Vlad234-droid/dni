import React, { FC } from 'react';
import Link from '@beans/link';
import Icon from '@beans/icon';

import { Type } from '../../config/types';
import { Wrapper, Content, Title, CloseIcon } from './styled';
import InfoPanelFootnote from '../InfoPanelFootnote';
import InfoPanelIcon from '../InfoPanelIcon';
import InfoPanelContent from '../InfoPanelContent';

type Props = {
  customIcon?: string;
  title: string;
  content?: string[];
  footnote?: {
    title: string;
    link: string;
    linkText: string;
  };
  type: Type;
  infoLink?: string;
  onClose?: () => void;
  isSmall?: boolean;
};

const InfoPanel: FC<Props> = ({ type, title, content, footnote, infoLink, customIcon, onClose, isSmall = false }) => (
  <Wrapper type={type} isSmall={isSmall} canClose={!!onClose}>
    {onClose && (
      <CloseIcon isSmall={isSmall}>
        <Icon graphic='close' onClick={onClose} />
      </CloseIcon>
    )}
    <InfoPanelIcon type={type} customIcon={customIcon} />
    <Content type={type} isSmall={isSmall}>
      <Title isSmall={isSmall}>{title}</Title>
      <InfoPanelContent content={content} isSmall={isSmall} />
      {footnote && <InfoPanelFootnote footnote={footnote} />}
      {!(type === Type.INFO) && (
        <Link href={infoLink} icon={{ graphic: 'externalLink', position: { global: 'right' } }} variant='textButton'>
          Fill the survey
        </Link>
      )}
    </Content>
  </Wrapper>
);

export default InfoPanel;
