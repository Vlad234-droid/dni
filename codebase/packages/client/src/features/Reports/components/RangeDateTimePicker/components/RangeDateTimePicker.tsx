import React, { FC } from 'react';

import DateTimePicker, { Type } from '../../DateTimePicker';
import { Wrapper, ItemWrapper } from './styled';
import { DatePoint } from '../../../config/types';

type Props = {
  from: DatePoint;
  to: DatePoint;
  required?: boolean;
  handleRangeChange: ({ value, prop }: { value: DatePoint; prop: string }) => void;
};

const RangeDateTimePicker: FC<Props> = ({ from, to, required = true, handleRangeChange }) => {
  const handleStartChange = (value: DatePoint) => {
    handleRangeChange({
      value,
      prop: 'from',
    });
  };

  const handleEndChange = (value: DatePoint) => {
    handleRangeChange({
      value,
      prop: 'to',
    });
  };

  return (
    <Wrapper>
      <ItemWrapper>
        <DateTimePicker
          dateTime={from}
          required={required}
          type={Type.TYPE_START}
          handleDateChange={handleStartChange}
        />
      </ItemWrapper>
      <ItemWrapper>
        <DateTimePicker dateTime={to} required={required} type={Type.TYPE_END} handleDateChange={handleEndChange} />
      </ItemWrapper>
    </Wrapper>
  );
};

export default RangeDateTimePicker;
