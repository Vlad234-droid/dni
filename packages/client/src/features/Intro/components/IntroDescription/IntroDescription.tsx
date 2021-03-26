import React, { FC } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';

import data from '../../config/data';
import { Wrapper, Title, Content } from './styled';

type Props = {
  onClick: () => void;
  isOpen: boolean;
};

const IntroDescription: FC<Props> = ({ onClick, isOpen }) => (
  <Wrapper>
    <Title>{data.description.title}</Title>
    <Content isOpen={isOpen}>
      {data.description.content.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </Content>
    <Button onClick={onClick} inverse variant='primary'>
      {isOpen ? 'Read less' : 'Read more'}
      <Icon graphic={isOpen ? 'contract' : 'expand'} size='xx' />
    </Button>
  </Wrapper>
);

export default IntroDescription;
