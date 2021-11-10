import React, { FC, useState } from 'react';


import IntroHeading from '../IntroHeading';
import IntroDescription from '../IntroDescription';
import IntroVideo from '../IntroVideo';
import { Wrapper, Content } from './styled';

const Intro: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  return (
    <Wrapper data-testid='intro'>
      <IntroHeading />
      <Content>
        <IntroDescription isOpen={isOpen} onClick={handleClick} />
        <IntroVideo />
      </Content>
    </Wrapper>
  );
};

export default Intro;
