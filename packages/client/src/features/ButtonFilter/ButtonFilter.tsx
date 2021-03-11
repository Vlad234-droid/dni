import React, { FC } from 'react';

import { Wrapper, Button } from './styled';

type Filter = {
  key: number | string;
  title: string;
  active: boolean;
};

type Props = {
  filters: Filter[];
  onChange: (key: number | string) => void;
};

const ButtonFilter: FC<Props> = ({ filters = [], onChange }) => {
  return (
    <Wrapper>
      {filters.map(({ title, active, key }) => (
        <Button key={key} active={active} onClick={() => onChange(key)}>
          {title}
        </Button>
      ))}
    </Wrapper>
  );
};

export default ButtonFilter;
