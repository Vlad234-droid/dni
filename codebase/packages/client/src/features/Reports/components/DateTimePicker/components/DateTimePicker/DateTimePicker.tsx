import React, { FC } from 'react';

import Picker from '../Picker';
import DatePicker from '../DatePicker';
import { DateRenderProps, DateTime, Type } from '../../config/types';
import { DATE_LABEL_BY_TYPE, DATE_NAME_BY_TYPE, DATE_ERROR_MESSAGE } from '../../config/dateTime';
import { Wrapper, DateWrapper } from './styled';
import { DatePoint } from '../../../../config/types';

type Props = {
  dateTime: DatePoint;
  type: Type;
  required: boolean;
  label?: string;
  handleDateChange: (value: DatePoint) => void;
};

const DateTimePicker: FC<Props> = ({ dateTime, type, required, label, handleDateChange }) => {
  return (
    <Wrapper data-testid={`${type}-datetime-picker`}>
      <DateWrapper>
        <Picker
          dateTime={dateTime}
          onChange={handleDateChange}
          render={(props: DateRenderProps | { value: DateTime }) => {
            const { isOpen, handleOpen, handleChange, isValid, value } = props as DateRenderProps;

            return (
              <DatePicker
                id={DATE_NAME_BY_TYPE[type]}
                name={DATE_NAME_BY_TYPE[type]}
                labelText={label || DATE_LABEL_BY_TYPE[type]}
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
    </Wrapper>
  );
};

export default DateTimePicker;
