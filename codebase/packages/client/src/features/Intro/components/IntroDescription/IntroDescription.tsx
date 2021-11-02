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
  const { isTablet } = useMedia();
  const showReadMore = isTablet;
  const adjustedIsOpen = showReadMore ? isOpen : true;

  return (
    <Wrapper>
      <Title>{data.description.title}</Title>
      <Content isOpen={adjustedIsOpen}>
        {data.description.content.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </Content>
      { showReadMore &&
      <Button onClick={onClick} inverse variant='primary' block={!isTablet}>
        {adjustedIsOpen ? 'Read less' : 'Read more'}
        <Icon graphic={adjustedIsOpen ? 'contract' : 'expand'} size='xx' />
      </Button>
      }
    </Wrapper>
  );
};

export default IntroDescription;
