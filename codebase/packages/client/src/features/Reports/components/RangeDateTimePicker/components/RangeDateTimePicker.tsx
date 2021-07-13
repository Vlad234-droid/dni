import React, { FC } from 'react';

import DateTimePicker, { Type } from '../../DateTimePicker';
import { Wrapper, ItemWrapper } from './styled';
import * as T from '../../../config/types';

type Props = {
  from: T.DatePoint;
  to: T.DatePoint;
  required?: boolean;
  handleRangeChange: ({ value, prop }: { value: T.DatePoint; prop: T.Prop }) => void;
};

const RangeDateTimePicker: FC<Props> = ({ from, to, required = true, handleRangeChange }) => {
  const handleStartChange = (value: T.DatePoint) => {
    handleRangeChange({
      value,
      prop: T.Prop.FROM,
    });
  };

  const handleEndChange = (value: T.DatePoint) => {
    handleRangeChange({
      value,
      prop: T.Prop.TO,
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
