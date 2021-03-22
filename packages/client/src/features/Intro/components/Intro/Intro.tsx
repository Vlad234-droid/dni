import React, { FC, useState } from 'react';
import IntroHeading from '../IntroHeading';
import IntroDescription from '../IntroDescription';
import IntroVideo from '../IntroVideo';
import { Wrapper, Reducer, Content } from './styled';

const Intro: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  // TODO: animate wrapper height (transform or animation)
  return (
    <Wrapper>
      <Reducer>
        <IntroHeading />
        <Content>
          <IntroDescription isOpen={isOpen} onClick={handleClick} />
          <IntroVideo />
        </Content>
      </Reducer>
    </Wrapper>
  );
};

export default Intro;
