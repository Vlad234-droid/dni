import React, {
  FC,
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
  MouseEvent,
} from 'react';
import styled, { css } from 'styled-components';
import SingleDatePicker from '@beans/date-picker';
import DateInputGroup from '@beans/date-input-group';
import { SINGLE_INPUT } from '@beans/date-input';
import SingleCalendar from '@beans/calendar';
import { DateTime, DateObject } from 'luxon';
import useEventListener from 'hooks/useEventListener';
import useRegisterField from 'hooks/useRegisterField';
import { Registrable } from '../FieldWrapper';

export const Wrapper = styled.div`
  display: inline-block;
  .beans-date-input__yyyy {
    width: 47px;
  }

  .beans-date-input__mm {
    width: 30px;
  }
`;

export const CalendarStyles = css`
  width: 330px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15) !important;
  border: none !important;
`;

interface Props {
  name: string;
  date?: DateTime;
  label: string;
  error?: string;
  onChange: (date: DateObject) => void;
}

type DateValue = {
  date: Record<'dd' | 'mm' | 'yyyy', number | undefined>;
  valid?: Record<string, boolean>;
};

// TODO: style calendar date items (Maybe ID is important)
const DatePicker: FC<Props & Partial<Registrable>> = ({
  onChange,
  date,
  label,
  name,
  error,
  ...methods
}) => {
  const [value, updateValue] = useState<DateValue['date']>();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isValid, setValid] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const setValue = useRegisterField(methods, name);

  useEffect(() => {
    if (date) {
      const { year, month, day } = date.toObject();
      updateValue({ yyyy: year, mm: month, dd: day });
    }
  }, []);

  const handleClickOutside = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const element = event?.target as HTMLElement;
      // @ts-ignore
      if (isOpen && element && !wrapperRef.current?.contains(element)) {
        setOpen(false);
      }
    },
    [isOpen],
  );

  useEventListener('mousedown', handleClickOutside);

  useEffect(() => {
    if (!value) return;
    const { yyyy: year, mm: month, dd: day } = value;
    if (!year || !month || !day) return;
    const date = DateTime.fromObject({ year, month, day });
    if (typeof setValue !== 'undefined') {
      setValue(name, date);
    } else {
      onChange({ year, month, day });
    }
  }, [value]);

  const handleChangeDate = ({ date, valid }: DateValue) => {
    const isValidDate = valid
      ? !Object.values(valid).some((valid) => !valid)
      : true;
    setValid(isValidDate);
    updateValue(date);
  };

  const handleOnFocus = useCallback(() => {
    setOpen(true);
  }, []);

  const memoizedRenderCalendar = useMemo(
    () => () => (
      <div data-testid={`date-single-calendar`}>
        <SingleCalendar
          date={value}
          onCalendarDateChange={handleChangeDate}
          styles={[CalendarStyles]}
          defaultFocus={true}
        />
      </div>
    ),
    [value],
  );

  const memoizedRenderFormGroup = useMemo(
    () => () => (
      <div data-testid={`date-input-group`}>
        <DateInputGroup
          required
          labelText={label}
          date={value}
          variant={SINGLE_INPUT}
          onDateInputChange={handleChangeDate}
          error={!isValid || Boolean(error)}
          errorMassage={error}
          onFocus={handleOnFocus}
        />
      </div>
    ),
    [value, error],
  );

  return (
    <Wrapper ref={wrapperRef}>
      <SingleDatePicker
        open={isOpen}
        renderCalendar={memoizedRenderCalendar}
        renderFormGroup={memoizedRenderFormGroup}
      />
    </Wrapper>
  );
};

export default DatePicker;
