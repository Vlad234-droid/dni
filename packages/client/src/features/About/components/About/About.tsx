import React, { FC, useState } from 'react';
import AboutHeading from '../AboutHeading';
import AboutDescription from '../AboutDescription';
import AboutVideo from '../AboutVideo';
import { Wrapper, Reducer, Content } from './styled';

const About: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  // TODO: animate wrapper height (transform or animation)
  return (
    <Wrapper>
      <Reducer>
        <AboutHeading />
        <Content>
          <AboutDescription isOpen={isOpen} onClick={handleClick} />
          <AboutVideo />
        </Content>
      </Reducer>
    </Wrapper>
  );
};

export default About;
