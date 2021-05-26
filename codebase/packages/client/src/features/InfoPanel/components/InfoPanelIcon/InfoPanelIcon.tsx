import React, { FC } from 'react';
import Icon from '@beans/icon';

import { useMedia } from 'context/InterfaceContext';

import { Type } from '../../config/types';
import { CustomIconWrapper, IconWrapper } from './styled';

type Props = {
  customIcon?: string;
  type: Type;
};

const InfoPanel: FC<Props> = ({ type, customIcon }) => {
  const { isMobile } = useMedia();
  const iconSize = isMobile ? 'xl' : 'xxxl';

  return (
    <>
      {customIcon && (
        <CustomIconWrapper>
          <Icon graphic={customIcon} size={iconSize} />
        </CustomIconWrapper>
      )}
      {type === Type.SUCCESS && (
        <IconWrapper type={type}>
          <Icon graphic='benefits' size={iconSize} />
        </IconWrapper>
      )}
    </>
  );
};

export default InfoPanel;
