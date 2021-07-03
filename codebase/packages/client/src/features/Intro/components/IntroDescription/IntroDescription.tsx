import React, { FC } from 'react';

import data from '../../config/data';
import { Wrapper, Title, Content } from './styled';

const IntroDescription: FC = () => {
  return (
    <Wrapper>
      <Title>{data.description.title}</Title>
      <Content isOpen={true}>
        {data.description.content.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </Content>
    </Wrapper>
  );
};

export default IntroDescription;
