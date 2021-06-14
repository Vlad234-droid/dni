import React, { FC } from 'react';
import styled from 'styled-components';
import Icon from '@beans/icon';
import Button from '@beans/button';

import FocusDot from '../FocusDot';
import { useMedia } from 'context/InterfaceContext';

type Props = {
  itemsCount: number;
  activeItem: number;
  next?: () => void;
  prev?: () => void;
};

const ActiveItemControl: FC<Props> = ({ itemsCount, activeItem, next, prev }) => {
  const { isMobile } = useMedia();

  return (
    <Wrapper>
      {!isMobile && (
        <NavigationButton onClick={prev} variant='secondary'>
          <Icon graphic='backwardLink' strokeWidth={2} />
        </NavigationButton>
      )}
      {Array.from({ length: itemsCount }, (_, index) => (
        <DowWrapper key={index}>
          <FocusDot active={index === activeItem} />
        </DowWrapper>
      ))}
      {!isMobile && (
        <NavigationButton onClick={next} variant='secondary'>
          <Icon graphic='forwardLink' strokeWidth={2} />
        </NavigationButton>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  flex: 1 1 auto;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  text-align: center;
  padding: 16px 0;
`;

const NavigationButton = styled(Button)`
  min-width: 24px;
  height: 24px;
  margin: 0 30px;

  svg {
    transform: scale(0.75);
  }
`;

const DowWrapper = styled.span`
  padding: 0 5px;
`;

export default ActiveItemControl;
