import React, { FC } from 'react';
import Icon from '@beans/icon';
import theme from 'theme';

import { useMedia } from 'context/InterfaceContext';

import { Wrapper, IconWrapper, Overflower, Label } from './styled';


import tescoVideo720 from 'assets/videos/tesco_720p.mp4';

const IntroVideo: FC = () => {
  const { isMobile, isLargeMobile } = useMedia();
  const iconColor = isMobile || isLargeMobile ? theme.colors.grayscale : theme.colors.white;

  return (
    <Wrapper data-testid='intro-video'>
      <Overflower>
        <video
          src={tescoVideo720}
          width='439'
          height='275'
          controls
        />
        <Label>
          <IconWrapper>
            <Icon graphic='curveArrow' size='sm' stroke={iconColor} />
          </IconWrapper>
          <span>A quick video about D&amp;I</span>
        </Label>
      </Overflower>
    </Wrapper>
  );
};

export default IntroVideo;
