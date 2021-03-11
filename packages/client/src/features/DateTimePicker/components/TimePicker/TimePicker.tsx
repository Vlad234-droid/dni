import React, { FC, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import FormGroup from '@beans/form-group';
import SingleDatePicker from '@beans/date-picker';

import TimeInput from '../TimeInput';
import TimeDropdown from '../TimeDropdown';
import { getAvailableTimeOptions } from '../../utils';
import { DateTimeProps, Time, TimeValid } from '../../config/types';
import { TIME_ERROR_MESSAGE } from '../../config/dateTime';

export const CalendarContainer = styled.div`
  margin-top: 4px;
`;

interface Props extends DateTimeProps {
  time: Time;
  isDropdownOpen: boolean;
  onDropdownToggle: (value: boolean) => void;
  isTimeValid: boolean;
  onTimeChange: ({ valid, value }: { valid: TimeValid; value: Time }) => void;
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
}) => {
  const [timeOptions] = useState(getAvailableTimeOptions());

  const memoizedRenderCalendar = useMemo(
    () => () => (
      <TimeDropdown
        selectedTime={time}
        onSelect={handleSelect}
        onEnter={handleDropdownClose}
        options={timeOptions}
      />
    ),
    [id, time],
  );

  const memoizedRenderFormGroup = useMemo(
    () => () => (
      <FormGroup
        id={id}
        labelText={labelText}
        required={required}
        error={!isTimeValid}
        name={name}
        errorMessage={TIME_ERROR_MESSAGE}
      >
        <TimeInput
          onTimeInputChange={handleInputChange}
          id={`${id}-time-input`}
          error={!isTimeValid}
          time={time}
          onIconClick={handleIconClick(isDropdownOpen)}
          name={`${name}-time-input`}
        />
      </FormGroup>
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
      open={isTimeValid && isDropdownOpen}
      renderCalendar={memoizedRenderCalendar}
      renderFormGroup={memoizedRenderFormGroup}
      required={required}
      CalendarContainer={CalendarContainer}
    />
  );
};

export default TimePicker;
