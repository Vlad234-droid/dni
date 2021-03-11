import React, { FC } from 'react';
import styled from 'styled-components';
import { DateObjectUnits } from 'luxon';

import Picker from '../Picker';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';
import { getDateObject, getTimeObject } from '../../utils';
import { DateRenderProps, TimeRenderProps, DateTime } from '../../config/types';
import {
  DATE_LABEL_BY_TYPE,
  DATE_NAME_BY_TYPE,
  TIME_LABEL_BY_TYPE,
  TIME_NAME_BY_TYPE,
  TYPE_END,
  TYPE_START,
} from '../../config/dateTime';

const DateWrapper = styled.div`
  margin-right: 16px;
`;

type Props = {
  dateTime?: DateObjectUnits;
  type: typeof TYPE_START | typeof TYPE_END;
  required: boolean;
};

const DateTimePicker: FC<Props> = ({ dateTime, type, required }) => (
  <>
    <DateWrapper>
      <Picker
        dateTime={getDateObject(dateTime)}
        render={(props: DateRenderProps | { value: DateTime }) => {
          const {
            isOpen,
            setIsOpen,
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
              onCalendarToggle={setIsOpen}
              date={value}
              isDateValid={isValid}
              onDateChange={handleChange}
            />
          );
        }}
      />
    </DateWrapper>
    <Picker
      dateTime={getTimeObject(dateTime)}
      render={(props: TimeRenderProps | { value: DateTime }) => {
        const {
          isOpen,
          setIsOpen,
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
            onDropdownToggle={setIsOpen}
            time={value}
            isTimeValid={isValid}
            onTimeChange={handleChange}
          />
        );
      }}
    />
  </>
);

export default DateTimePicker;
