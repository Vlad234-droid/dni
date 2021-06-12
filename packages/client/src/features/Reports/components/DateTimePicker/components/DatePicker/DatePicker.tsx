import React, { FC, useEffect } from 'react';
import { css } from 'styled-components';
import SingleDatePicker from '@beans/date-picker';
import DateInputGroup from '@beans/date-input-group';
import { SINGLE_INPUT } from '@beans/date-input';
import SingleCalendar from '@beans/calendar';

import { DateTimeProps, Date, DateValid } from '../../config/types';

export const CalendarStyles = css`
  width: 328px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15) !important;
  border: none !important;
`;

interface Props extends DateTimeProps {
  date: Date;
  isCalendarOpen: boolean;
  onCalendarToggle: (value: boolean) => void;
  isDateValid: boolean;
  onDateChange: ({ valid, value }: { valid: DateValid; value: Date }) => void;
  errorMessage: string;
}

// TODO: style calendar date items
const DatePicker: FC<Props> = ({
  id,
  name,
  labelText,
  required,
  isCalendarOpen,
  onCalendarToggle,
  onDateChange,
  isDateValid,
  date,
  errorMessage,
}) => {
  const handleCalendarDateChange = ({ date }: { date: Date }) => {
    onDateChange({ valid: { dd: true, mm: true, yyyy: true }, value: date });
  };

  const handleOnFocus = () => {
    isDateValid && onCalendarToggle(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = ({ valid, date }: any) => {
    onDateChange({ valid, value: date });
  };

  // close calendar because handleOnFocus is called before isDateValid value changes
  useEffect(() => {
    onCalendarToggle(false);
  }, [isDateValid]);

  return (
    <SingleDatePicker
      id={id}
      name={name}
      open={isCalendarOpen}
      renderCalendar={() => (
        <div data-testid={`${id}-single-calendar`}>
          <SingleCalendar
            date={date}
            id={`${id}-calendar`}
            onCalendarDateChange={handleCalendarDateChange}
            styles={[CalendarStyles]}
            defaultFocus={true}
          />
        </div>
      )}
      renderFormGroup={() => (
        <div data-testid={`${id}-input-group`}>
          <DateInputGroup
            id={`${id}-date-input`}
            labelText={labelText}
            variant={SINGLE_INPUT}
            onDateInputChange={handleInputChange}
            error={!isDateValid}
            onFocus={handleOnFocus}
            date={date}
            required={required}
            errorMessage={errorMessage}
          />
        </div>
      )}
      required={required}
    />
  );
};

export default DatePicker;
