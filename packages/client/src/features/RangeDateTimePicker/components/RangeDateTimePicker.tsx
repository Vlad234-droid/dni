import React, { FC, useState, useCallback } from 'react';
import { DateObjectUnits } from 'luxon';

import DateTimePicker, { Type } from 'features/DateTimePicker';

import { isEndValueValid } from '../utils';
import { Wrapper, ItemWrapper } from './styled';

type Props = {
  start?: DateObjectUnits;
  end?: DateObjectUnits;
  required?: boolean;
};

const RangeDateTimePicker: FC<Props> = ({ start, end, required = true }) => {
  const [isStartValid, setStartValid] = useState(true);
  const [isEndValid, setEndValid] = useState(isEndValueValid(start, end));
  const [startValue, setStartValue] = useState(start);
  const [endValue, setEndValue] = useState(end);

  const handleStartChange = useCallback(
    (value: DateObjectUnits) => {
      setStartValue(value);
      !isEndValid && setEndValid(true);

      if (endValue && endValue <= value) {
        setStartValid(false);
      } else {
        setStartValid(true);
      }
    },
    [endValue],
  );

  const handleEndChange = useCallback(
    (value: DateObjectUnits) => {
      setEndValue(value);
      !isStartValid && setStartValid(true);

      if (startValue && startValue >= value) {
        setEndValid(false);
      } else {
        setEndValid(true);
      }
    },
    [startValue],
  );

  return (
    <Wrapper>
      <ItemWrapper>
        <DateTimePicker
          dateTime={startValue}
          required={required}
          type={Type.TYPE_START}
          onChange={handleStartChange}
          isRangeValid={isStartValid}
        />
      </ItemWrapper>
      <ItemWrapper>
        <DateTimePicker
          dateTime={endValue}
          required={required}
          type={Type.TYPE_END}
          onChange={handleEndChange}
          isRangeValid={isEndValid}
        />
      </ItemWrapper>
    </Wrapper>
  );
};

export default RangeDateTimePicker;
