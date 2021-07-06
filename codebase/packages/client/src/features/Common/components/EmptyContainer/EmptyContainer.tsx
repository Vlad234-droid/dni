import React, { FC } from 'react';

import { useMedia } from 'context/InterfaceContext';
import theme from 'theme';

import { Wrapper, Inner, Description, StyledIcon, Explanation } from './styled';
import { Level, DEFAULT_DESCRIPTION, DEFAULT_EXPLANATION } from './config';

type Props = {
  description: string | JSX.Element;
  explanation?: string;
  level?: Level;
};

const EmptyContainer: FC<Props> = ({
  description = DEFAULT_DESCRIPTION,
  explanation = DEFAULT_EXPLANATION,
  level = Level.ERROR,
}) => {
  const { isDesktop } = useMedia();

  return (
    <Wrapper data-testid='empty-container'>
      <Inner>
        <Description level={level}>{description}</Description>
        {level == Level.ERROR && (
          <StyledIcon
            graphic='error'
            size={isDesktop ? 'xl' : 'sm'}
            stroke={theme.colors.error}
            data-testid='empty-icon'
          />
        )}
      </Inner>
      {explanation && <Explanation>{explanation}</Explanation>}
    </Wrapper>
  );
};

export default EmptyContainer;
