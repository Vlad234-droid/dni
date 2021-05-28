import React, { FC, useState, useCallback } from 'react';
import RadioButtonGroup from '@beans/radio-button-group';

import { Wrapper } from './styled';

type Filter = {
  key: number | string;
  title: string;
};

type Props = {
  initialFilters: Filter[];
  onChange: (key: number | string) => void;
  name?: string;
};

const ButtonFilter: FC<Props> = ({ initialFilters = [], onChange, name }) => {
  const [filters, setFilters] = useState(initialFilters);

  const changeFilter = useCallback(
    (event) => {
      const key = event.target.value;

      onChange(key);
      setFilters(
        filters.map((filter) => ({ ...filter, active: key === filter.key })),
      );
    },
    [filters, onChange],
  );

  return (
    <Wrapper>
      <RadioButtonGroup
        radioButtons={filters.map(({ title, key }) => ({
          id: key,
          labelText: title,
          value: key,
        }))}
        name={name}
        onChange={changeFilter}
        required
        defaultCheckedValue={filters[0].key}
      />
    </Wrapper>
  );
};

export default ButtonFilter;
