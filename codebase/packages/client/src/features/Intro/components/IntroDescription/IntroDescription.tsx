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
  const adjustedIsOpen = isDesktop ? isOpen : true;

  return (
    <Wrapper data-testid='intro-description'>
      <Title>{data.description.title}</Title>
      <Content data-testid='intro-description-content' isOpen={adjustedIsOpen}>
        {data.description.content.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </Content>
      {isDesktop &&
      <Button onClick={onClick} inverse variant='primary' block={!isDesktop}>
        {adjustedIsOpen ? 'Read less' : 'Read more'}
        <Icon graphic={adjustedIsOpen ? 'contract' : 'expand'} size='xx' />
      </Button>
      }
    </Wrapper>
  );
};

export default IntroDescription;
