import React, { FC } from 'react';

import { useMedia } from 'context/InterfaceContext';
import theme from 'theme';

import { Wrapper, Inner, Description, StyledIcon, Explanation } from './styled';

type Props = {
  description: string | JSX.Element;
  explanation?: string;
  showIcon?: boolean;
};

const DEFAULT_DESCRIPTION = 'Something went wrong';
const DEFAULT_EXPLANATION =
  'Unfortunately, we did not find any matches for your request. Please change your filtering criteria to try again.';

const EmptyContainer: FC<Props> = ({
  description = DEFAULT_DESCRIPTION,
  explanation = DEFAULT_EXPLANATION,
  showIcon = true,
}) => {
  const { isDesktop } = useMedia();

  return (
    <Wrapper data-testid='empty-container'>
      <Inner>
        <Description>{description}</Description>
        {showIcon && (
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
