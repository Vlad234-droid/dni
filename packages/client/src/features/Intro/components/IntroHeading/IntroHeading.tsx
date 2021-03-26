import React, { FC } from 'react';

import data from '../../config/data';
import { Wrapper, Title, Subtitle } from './styled';

const IntroHeading: FC = () => (
  <Wrapper>
    <Title>{data.title}</Title>
    <Subtitle>
      {data.subtitle.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </Subtitle>
  </Wrapper>
);

export default IntroHeading;
