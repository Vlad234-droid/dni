import React, { FC } from 'react';
import Button from '@beans/button';
import Icon from '@beans/icon';

import { useMedia } from 'context/InterfaceContext';

import data from '../../config/data';
import { Wrapper, Title, Content } from './styled';

type Props = {
  onClick: () => void;
  isOpen: boolean;
};

const IntroDescription: FC<Props> = ({ onClick, isOpen }) => {
  const { isDesktop } = useMedia();

  return (
    <Wrapper>
      <Title>{data.description.title}</Title>
      <Content isOpen={isOpen}>
        {data.description.content.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </Content>
      <Button onClick={onClick} inverse variant='primary' block={!isDesktop}>
        {isOpen ? 'Read less' : 'Read more'}
        <Icon graphic={isOpen ? 'contract' : 'expand'} size='xx' />
      </Button>
    </Wrapper>
  );
};

export default IntroDescription;