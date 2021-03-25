import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  FC,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
} from 'react';
import Input from '@beans/input';
import { KEY_CODES } from 'config/constants';
import FormGroup from '@beans/form-group';
import { DateTime, DateObject } from 'luxon';

import { getKeyCode } from 'utils/browser';
import useRegisterField from 'hooks/useRegisterField';
import { Time, TimePart } from '../../config/types';
import { Registrable } from '../FieldWrapper';

import { InputContainer, DateSeparator, fragmentStyles } from './styled';

export const VISIBLE_TIME_SEPARATOR = ':';

type Props = {
  date?: DateTime;
  onChange: (time: DateObject) => void;
  name: string;
  label: string;
};

const VALID_TIME: Record<TimePart, number> = {
  hh: 24,
  mm: 60,
};

const TimeInput: FC<Props & Partial<Registrable>> = ({
  date,
  name,
  onChange,
  label,
  ...methods
}) => {
  const inputHRefs = useRef<HTMLInputElement>();
  const inputMRefs = useRef<HTMLInputElement>();
  const currentValue = useRef<Time>();
  const [time, updateTime] = useState<Time>({ hh: '', mm: '' });
  const [valid, setValid] = useState<Record<keyof Time, boolean>>({
    hh: true,
    mm: true,
  });
  const [isInputInFocus, setInputInFocus] = useState(false);
  const setValue = useRegisterField(methods, name);

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const element = event.target;
    const { value, name } = element;
    setTime(name, value);
  };

  const setTime = (name: string, value: string) => {
    if (isNaN(Number(value)) || Number(value) < 0) return;
    updateTime({ ...time, [name]: value });
  };

  const validate = (testValue: Time) => {
    const entries = Object.entries(testValue) as Array<[keyof Time, string]>;
    return entries.reduce((acc, [key, value]) => {
      acc[key] = Number(value) <= VALID_TIME[key];
      return acc;
    }, {} as Record<keyof Time, boolean>);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setInputInFocus(false);
    const { value, name } = event.target;
    if (value && value.length < 2) {
      updateTime({ ...time, [name]: addLeadingZero(value) });
    }
  };

  useEffect(() => {
    if (!date) return;
    const { hour, minute } = date.toObject();
    const hh = addLeadingZero(`${hour}`);
    const mm = addLeadingZero(`${minute}`);
    updateTime({ hh, mm });
  }, []);

  useEffect(() => {
    if (!currentValue.current) {
      currentValue.current = time;
      return;
    }
    setValid(validate(time));
  }, [time]);

  const isInvalid = useMemo(() => {
    return Object.values(valid).some((value) => !value);
  }, [valid]);

  useEffect(() => {
    if (!isInvalid) {
      const { hh, mm } = time;
      if (!hh || !mm) return;
      const data = { hour: Number(hh), minute: Number(mm) };
      if (typeof setValue !== 'undefined') {
        setValue(name, data);
      } else {
        onChange({ hour: Number(hh), minute: Number(mm) });
      }
    }
  }, [valid]);

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    event.preventDefault();
    const element = event.currentTarget as HTMLInputElement;

    setInputInFocus(true);
    element.select();
  };

  const focusNextInput = () => {
    // @ts-ignore
    inputMRefs.current && inputMRefs.current?.focus({ preventScroll: true });
  };

  const focusPrevInput = () => {
    // @ts-ignore
    inputHRefs.current && inputHRefs.current?.focus({ preventScroll: true });
  };

  const addLeadingZero = (value: string) => {
    if (value && value.length < 2) {
      return `0${value}`;
    }
    return value;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const key = getKeyCode(event);
    if (key === KEY_CODES.leftArrow) {
      event.preventDefault();
      focusPrevInput();
    } else if (key === KEY_CODES.rightArrow) {
      event.preventDefault();
      focusNextInput();
    } else if (key === KEY_CODES.upArrow) {
      event.preventDefault();
      const element = event.target as HTMLInputElement;
      const { value, name } = element;
      setTime(name, addLeadingZero(`${(Number(value) || 0) + 1}`));
    } else if (key === KEY_CODES.downArrow) {
      event.preventDefault();
      const element = event.target as HTMLInputElement;
      const { value, name } = element;
      setTime(name, addLeadingZero(`${(Number(value) || 1) - 1}`));
    }
  };

  return (
    <FormGroup labelText={label} required>
      <InputContainer focus={isInputInFocus} aria-label={''} error={isInvalid}>
        <Input
          dataTestid={`${name}-input-hh`}
          autoComplete={'off'}
          maxLength={2}
          name={'hh'}
          placeholder={'HH'}
          value={time.hh}
          onFocus={handleFocus}
          onChange={handleChangeValue}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          domRef={inputHRefs}
          bare={true}
          styles={fragmentStyles['hh']}
        />
        <DateSeparator data-testid={`separator`}>
          {VISIBLE_TIME_SEPARATOR}
        </DateSeparator>
        <Input
          dataTestid={`${name}-input-mm`}
          autoComplete={'off'}
          maxLength={2}
          name={'mm'}
          placeholder={'MM'}
          value={time.mm}
          onFocus={handleFocus}
          onChange={handleChangeValue}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          domRef={inputMRefs}
          bare={true}
          styles={fragmentStyles['mm']}
        />
      </InputContainer>
    </FormGroup>
  );
};

export default TimeInput;
