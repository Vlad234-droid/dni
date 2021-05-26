import React, { FC } from 'react';
import Icon from '@beans/icon';
import { Wrapper, Description, Explanation } from './styled';
import theme from 'theme';

type Props = {
  description: string | JSX.Element;
  explanation?: string;
};

const EmptyList: FC<Props> = ({ description, explanation }) => {
  return (
    <Wrapper data-testid='empty-container'>
      <Icon
        graphic='error'
        size='xxxl'
        stroke={theme.colors.warning}
        data-testid='empty-icon'
      />
      <Description>{description}</Description>
      {explanation && <Explanation>{explanation}</Explanation>}
    </Wrapper>
  );
};

export default EmptyList;
