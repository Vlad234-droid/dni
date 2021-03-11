import React, { FC } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';

import { Wrapper, Title, Content } from './styled';

type Props = {
  onClick: () => void;
  isOpen: boolean;
};

const AboutDescription: FC<Props> = ({ onClick, isOpen }) => (
  <Wrapper>
    <Title>At Tesco, inclusion means that Everyone’s Welcome</Title>
    <Content isOpen={isOpen}>
      Everyone is treated fairly and with respect; by valuing individuality and
      uniqueness we create a sense of belonging. Diversity and inclusion has
      always been at the heart of Tesco. It is embedded in our values: we treat
      people how they want to be treated. We always want our colleagues to feel
      they can be themselves at work and we are committed to helping them be at
      their best. Across the Tesco group we are building an inclusive workplace,
      a place to actively celebrate the cultures, personalities and preferences
      of our colleagues – who in turn help to build the success of our business,
      and reflect the diversity of the communities we serve.
    </Content>
    <Button onClick={onClick} inverse variant='primary'>
      {isOpen ? 'Read less' : 'Read more'}
      <Icon graphic={isOpen ? 'contract' : 'expand'} size='xx' />
    </Button>
  </Wrapper>
);

export default AboutDescription;
