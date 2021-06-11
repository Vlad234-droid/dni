import React, { FC } from 'react';
import Icon from '@beans/icon';
import theme from 'theme';

import { useMedia } from 'context/InterfaceContext';

import { Wrapper, IconWrapper, Label } from './styled';
import tescoVideo from 'assets/tesco_video.mp4';

const IntroVideo: FC = () => {
  const { isMobile, isLargeMobile } = useMedia();
  const iconColor = isMobile || isLargeMobile ? theme.colors.grayscale : theme.colors.white;

  return (
    <Wrapper>
      <div>
        <video width='439' height='275' controls>
          <source src={tescoVideo} />
        </video>
        <Label>
          <IconWrapper>
            <Icon graphic='curveArrow' size='sm' stroke={iconColor} />
          </IconWrapper>
          <span>A quick video about D&I</span>
        </Label>
      </div>
    </Wrapper>
  );
};

export default IntroVideo;
