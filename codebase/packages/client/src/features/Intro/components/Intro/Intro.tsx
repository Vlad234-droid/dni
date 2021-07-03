import React, { FC } from 'react';

import IntroHeading from '../IntroHeading';
import IntroDescription from '../IntroDescription';
import IntroVideo from '../IntroVideo';
import { Wrapper, Content } from './styled';

const Intro: FC = () => {
  return (
    <Wrapper>
      <IntroHeading />
      <Content>
        <IntroDescription />
        <IntroVideo />
      </Content>
    </Wrapper>
  );
};

export default Intro;
