import React, { FC } from 'react';
import Icon from '@beans/icon';
import theme from 'theme';

import { useMedia } from 'context/InterfaceContext';
import { WistiaPlayer } from 'features/Common';

import { Wrapper, IconWrapper, Label, VideoContainer } from './styled';

const IntroVideo: FC = () => {
  const { isMobile, isLargeMobile } = useMedia();
  const iconColor = isMobile || isLargeMobile ? theme.colors.grayscale : theme.colors.white;

  return (
    <Wrapper>
      <VideoContainer data-testid='intro-video'>
        <WistiaPlayer videoId='barwvn0bfw' aspectRatio={100}/>
      </VideoContainer>
      <Label>
        <IconWrapper>
          <Icon graphic='curveArrow' size='sm' stroke={iconColor} />
        </IconWrapper>
        <span>A quick video about D&amp;I</span>
      </Label>
    </Wrapper>
  );
};

export default IntroVideo;
