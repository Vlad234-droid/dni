import React, { FC } from 'react';
import Icon from '@beans/icon';

import { Type } from '../../config/types';
import { CustomIconWrapper, IconWrapper } from './styled';

type Props = {
  customIcon?: string;
  type: Type;
};

const InfoPanel: FC<Props> = ({ type, customIcon }) => {
  return (
    <>
      {customIcon && (
        <CustomIconWrapper>
          <Icon graphic={customIcon} size='xl' />
        </CustomIconWrapper>
      )}
      {type === Type.SUCCESS && (
        <IconWrapper type={type}>
          <Icon graphic='benefits' size='xl' />
        </IconWrapper>
      )}
    </>
  );
};

export default InfoPanel;
