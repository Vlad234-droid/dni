import React, { FC, useCallback, useMemo, useEffect } from 'react';
import { css } from 'styled-components';
import SingleDatePicker from '@beans/date-picker';
import DateInputGroup from '@beans/date-input-group';
import { SINGLE_INPUT } from '@beans/date-input';
import SingleCalendar from '@beans/calendar';

import { DateTimeProps, Date, DateValid } from '../../config/types';
import { DATE_ERROR_MESSAGE } from '../../config/dateTime';

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
}) => {
  const memoizedRenderCalendar = useMemo(
    () => () => (
      <SingleCalendar
        date={date}
        id={`${id}-calendar`}
        onCalendarDateChange={handleCalendarDateChange}
        styles={[CalendarStyles]}
        defaultFocus={true}
      />
    ),
    [id, date],
  );

  const memoizedRenderFormGroup = useMemo(
    () => () => (
      <DateInputGroup
        id={`${id}-date-input`}
        labelText={labelText}
        variant={SINGLE_INPUT}
        onDateInputChange={handleInputChange}
        error={!isDateValid}
        onFocus={handleOnFocus}
        date={date}
        required={required}
        errorMessage={DATE_ERROR_MESSAGE}
      />
    ),
    [id, labelText, required, date, isDateValid],
  );

  // close calendar because handleOnFocus is called before isDateValid value changes
  useEffect(() => {
    onCalendarToggle(false);
  }, [isDateValid]);

  const handleCalendarDateChange = useCallback(({ date }: { date: Date }) => {
    onDateChange({ valid: { dd: true, mm: true, yyyy: true }, value: date });
  }, []);

  const handleOnFocus = useCallback(() => {
    isDateValid && onCalendarToggle(true);
  }, [isDateValid]);

  const handleInputChange = useCallback(({ valid, date }) => {
    onDateChange({ valid, value: date });
  }, []);

  return (
    <SingleDatePicker
      id={id}
      name={name}
      open={isCalendarOpen}
      renderCalendar={memoizedRenderCalendar}
      renderFormGroup={memoizedRenderFormGroup}
      required={required}
    />
  );
};

export default DatePicker;
