import React, { FC } from 'react';
import { DateObjectUnits } from 'luxon';

import DateTimePicker, { TYPE_START, TYPE_END } from 'features/DateTimePicker';

import { Wrapper, ItemWrapper } from './styled';

type Props = {
  start?: DateObjectUnits;
  end?: DateObjectUnits;
  required?: boolean;
};

// TODO: validate range
const RangeDateTimePicker: FC<Props> = ({ start, end, required = true }) => {
  return (
    <Wrapper>
      <ItemWrapper>
        <DateTimePicker
          dateTime={start}
          required={required}
          type={TYPE_START}
        />
      </ItemWrapper>
      <ItemWrapper>
        <DateTimePicker dateTime={end} required={required} type={TYPE_END} />
      </ItemWrapper>
    </Wrapper>
  );
};

export default RangeDateTimePicker;
