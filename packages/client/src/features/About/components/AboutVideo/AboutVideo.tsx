import React, { FC } from 'react';
import styled from 'styled-components';

import { textXS } from 'styles';

import Arrow from '../../assets/curv-arrow.svg';
import tescoVideo from '../../assets/tesco_video.mp4';

const Label = styled.div`
  text-align: center;
  ${textXS}
`;

const Icon = styled.img`
  margin-right: 8px;
`;

const AboutVideo: FC = () => (
  <div>
    <video width='439' height='275' controls>
      <source src={tescoVideo} />
    </video>
    <Label>
      <Icon src={Arrow} />
      <span>A quick video about D&I</span>
    </Label>
  </div>
);

export default AboutVideo;
