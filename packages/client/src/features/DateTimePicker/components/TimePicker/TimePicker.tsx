import React, { FC, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import FormGroup from '@beans/form-group';
import SingleDatePicker from '@beans/date-picker';

import TimeInput from '../TimeInput';
import TimeDropdown from '../TimeDropdown';
import { getAvailableTimeOptions } from '../../utils';
import { DateTimeProps, Time, TimeValid } from '../../config/types';

export const CalendarContainer = styled.div`
  position: relative;
`;

interface Props extends DateTimeProps {
  time: Time;
  isDropdownOpen: boolean;
  onDropdownToggle: (value: boolean) => void;
  isTimeValid: boolean;
  onTimeChange: ({ valid, value }: { valid: TimeValid; value: Time }) => void;
  errorMessage: string;
}

const TimePicker: FC<Props> = ({
  id,
  name,
  labelText,
  required,
  isDropdownOpen,
  onDropdownToggle,
  onTimeChange,
  isTimeValid,
  time,
  errorMessage,
}) => {
  const [timeOptions] = useState(getAvailableTimeOptions());

  const memoizedRenderDropdown = useMemo(
    () => () => (
      <TimeDropdown
        selectedTime={time}
        onSelect={handleSelect}
        onEnter={handleDropdownClose}
        options={timeOptions}
        id={id}
      />
    ),
    [id, time],
  );

  const memoizedRenderFormGroup = useMemo(
    () => () => (
      <div data-testid={`${id}-input-group`}>
        <FormGroup
          id={id}
          labelText={labelText}
          required={required}
          error={!isTimeValid}
          name={name}
          errorMessage={errorMessage}
        >
          <TimeInput
            onTimeInputChange={handleInputChange}
            id={`${id}-input`}
            error={!isTimeValid}
            time={time}
            onIconClick={handleIconClick(isDropdownOpen)}
            name={`${name}-input`}
          />
        </FormGroup>
      </div>
    ),
    [id, labelText, required, time, isTimeValid, isDropdownOpen],
  );

  const handleDropdownClose = useCallback(() => {
    onDropdownToggle(false);
  }, []);

  const handleIconClick = useCallback(
    (isOpened) => () => {
      isTimeValid && onDropdownToggle(!isOpened);
    },
    [isTimeValid],
  );

  const handleSelect = useCallback((option: Time) => {
    onTimeChange({ valid: { hh: true, mm: true }, value: option });
  }, []);

  const handleInputChange = useCallback(({ valid, time }) => {
    onTimeChange({ valid, value: time });
  }, []);

  return (
    <SingleDatePicker
      id={id}
      name={name}
      open={isDropdownOpen}
      renderCalendar={memoizedRenderDropdown}
      renderFormGroup={memoizedRenderFormGroup}
      required={required}
      CalendarContainer={CalendarContainer}
    />
  );
};

export default TimePicker;
