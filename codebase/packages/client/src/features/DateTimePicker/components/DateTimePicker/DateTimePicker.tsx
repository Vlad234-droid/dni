import React, { FC, useState, useCallback, useEffect } from 'react';
import { DateObjectUnits } from 'luxon';
import isEqual from 'lodash.isequal';

import Picker from '../Picker';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';
import {
  getDateObject,
  getTimeObject,
  getDateTimeFromObject,
  areFragmentsFilled,
} from '../../utils';
import {
  DateRenderProps,
  TimeRenderProps,
  DateTime,
  Type,
} from '../../config/types';
import {
  DATE_LABEL_BY_TYPE,
  DATE_NAME_BY_TYPE,
  TIME_LABEL_BY_TYPE,
  TIME_NAME_BY_TYPE,
  TIME_ERROR_MESSAGE,
  DATE_ERROR_MESSAGE,
} from '../../config/dateTime';
import { Wrapper, DateWrapper } from './styled';

type Props = {
  dateTime?: DateObjectUnits;
  type: Type;
  required: boolean;
  onChange: (value: DateObjectUnits) => void;
  isRangeValid: boolean;
};

const DateTimePicker: FC<Props> = ({
  dateTime,
  type,
  required,
  onChange,
  isRangeValid,
}) => {
  const [date, setDate] = useState(getDateObject(dateTime));
  const [time, setTime] = useState(getTimeObject(dateTime));

  useEffect(() => {
    if (areFragmentsFilled(time)) {
      const updatedDateTime = getDateTimeFromObject(date, time);

      !isEqual(dateTime, updatedDateTime) && onChange(updatedDateTime);
    }
  }, [date, time, dateTime]);

  const handleDateChange = useCallback(
    (value) => {
      setDate(value);
    },
    [time],
  );

  const handleTimeChange = useCallback(
    (value) => {
      setTime(value);
    },
    [date],
  );

  return (
    <Wrapper data-testid={`${type}-datetime-picker`}>
      <DateWrapper>
        <Picker
          dateTime={date}
          onChange={handleDateChange}
          render={(props: DateRenderProps | { value: DateTime }) => {
            const {
              isOpen,
              handleOpen,
              handleChange,
              isValid,
              value,
            } = props as DateRenderProps;

            return (
              <DatePicker
                id={DATE_NAME_BY_TYPE[type]}
                name={DATE_NAME_BY_TYPE[type]}
                labelText={DATE_LABEL_BY_TYPE[type]}
                required={required}
                isCalendarOpen={isOpen}
                onCalendarToggle={handleOpen}
                date={value}
                isDateValid={isValid}
                onDateChange={handleChange}
                errorMessage={DATE_ERROR_MESSAGE}
              />
            );
          }}
        />
      </DateWrapper>
      <Picker
        dateTime={time}
        onChange={handleTimeChange}
        render={(props: TimeRenderProps | { value: DateTime }) => {
          const {
            isOpen,
            handleOpen,
            handleChange,
            isValid,
            value,
          } = props as TimeRenderProps;

          return (
            <TimePicker
              id={TIME_NAME_BY_TYPE[type]}
              name={TIME_NAME_BY_TYPE[type]}
              labelText={TIME_LABEL_BY_TYPE[type]}
              required={required}
              isDropdownOpen={isOpen}
              onDropdownToggle={handleOpen}
              time={value}
              isTimeValid={isValid && isRangeValid}
              onTimeChange={handleChange}
              errorMessage={TIME_ERROR_MESSAGE}
            />
          );
        }}
      />
    </Wrapper>
  );
};

export default DateTimePicker;
