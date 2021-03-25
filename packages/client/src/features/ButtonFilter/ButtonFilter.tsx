import React, { FC, useState, useCallback } from 'react';

import { Wrapper, Button } from './styled';

type Filter = {
  key: number | string;
  title: string;
  active: boolean;
};

type Props = {
  initialFilters: Filter[];
  onChange: (key: number | string) => void;
};

const ButtonFilter: FC<Props> = ({ initialFilters = [], onChange }) => {
  const [filters, setFilters] = useState(initialFilters);

  const changeFilter = useCallback(
    (key) => {
      onChange(key);
      setFilters(
        filters.map((filter) => ({ ...filter, active: key === filter.key })),
      );
    },
    [filters, onChange],
  );

  return (
    <Wrapper>
      {filters.map(({ title, active, key }) => (
        <Button key={key} active={active} onClick={() => changeFilter(key)}>
          {title}
        </Button>
      ))}
    </Wrapper>
  );
};

export default ButtonFilter;
