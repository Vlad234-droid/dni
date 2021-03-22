import React, { FC } from 'react';
import Icon from '@beans/icon';

import { useMedia } from 'context/InterfaceContext';

import { Wrapper, IconWrapper, Label } from './styled';
import tescoVideo from '../../assets/tesco_video.mp4';

const IntroVideo: FC = () => {
  const { isMobile } = useMedia();
  const iconColor = isMobile ? '#666' : 'white';

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
