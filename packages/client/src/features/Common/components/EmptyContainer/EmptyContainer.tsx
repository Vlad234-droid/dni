import React, { FC } from 'react';
import Icon from '@beans/icon';
import { Wrapper, Description, Explanation } from './styled';
import { defaultTheme } from '@beans/theme';

type Props = {
  description: string;
  explanation?: string;
};

const EmptyList: FC<Props> = ({ description, explanation }) => {
  return (
    <Wrapper>
      <Icon graphic='error' size='xxxl' stroke={defaultTheme.colors.warning} />
      <Description>{description}</Description>
      {explanation && <Explanation>{explanation}</Explanation>}
    </Wrapper>
  );
};

export default EmptyList;
