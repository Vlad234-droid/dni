import React from 'react';
import styled from 'styled-components';
import Button from '@beans/button';

type Button = {
  title: string;
  action: () => void;
};

type Props = {
  list: Array<Button>;
  activeIndex?: number;
};

const ButtonGroup = ({ list, activeIndex = 0 }: Props) => {
  return (
    <Wrapper>
      {list.map(({ title, action }, idx) => (
        <Button
          key={idx}
          className={'button_group'}
          onClick={action}
          variant={activeIndex === idx ? 'primary' : 'secondary'}
        >
          {title}
        </Button>
      ))}
    </Wrapper>
  );
};

export default ButtonGroup;

const Wrapper = styled.div`
  .button_group {
    border-radius: 0;

    &:first-child {
      border-top-left-radius: 24px;
      border-bottom-left-radius: 24px;
    }

    &:last-child {
      border-top-right-radius: 24px;
      border-bottom-right-radius: 24px;
    }
  }
`;
