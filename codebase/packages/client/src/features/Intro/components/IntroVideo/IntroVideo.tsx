import React, { FC } from 'react';
import Icon from '@beans/icon';
import theme from 'theme';

import { useMedia } from 'context/InterfaceContext';

import { Wrapper, IconWrapper, Label } from './styled';

import tescoVideo720 from 'assets/video/tesco_720p.mp4';
import tescoVideo1080 from 'assets/video/tesco_1080p.mp4';

const IntroVideo: FC = () => {
  const { isMobile, isLargeMobile } = useMedia();
  const iconColor = isMobile || isLargeMobile ? theme.colors.grayscale : theme.colors.white;

  return (
    <Wrapper>
      <div>
        <video width='439' height='275' controls>
          <source src={isMobile ? tescoVideo720 : tescoVideo1080} />
        </video>
        <Label>
          <IconWrapper>
            <Icon graphic='curveArrow' size='sm' stroke={iconColor} />
          </IconWrapper>
          <span>A quick video about D&amp;I</span>
        </Label>
      </div>
    </Wrapper>
  );
};

export default IntroVideo;
