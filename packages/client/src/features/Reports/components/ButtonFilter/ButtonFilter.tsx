import React, { FC } from 'react';
import RadioButtonGroup from '@beans/radio-button-group';

import { Wrapper } from './styled';

type Filter = {
  key: number | string;
  title: string;
};

type Props = {
  initialFilters: Filter[];
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (event: any) => void;
  value: string | number;
};

const TEST_ID = 'button-filter';

const ButtonFilter: FC<Props> = ({
  initialFilters = [],
  onChange,
  name,
  value,
}) => {
  return (
    <Wrapper data-testid={TEST_ID}>
      <RadioButtonGroup
        radioButtons={initialFilters.map(({ title, key }) => ({
          id: key,
          labelText: title,
          value: key,
        }))}
        name={name}
        onChange={onChange}
        required
        checkedValue={value}
      />
    </Wrapper>
  );
};

export default ButtonFilter;
