import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DateTime, DateObject } from 'luxon';

import useRegisterField from 'hooks/useRegisterField';

import { Registrable } from '../FieldWrapper';
import DatePicker from '../DatePicker';
import TimeInput from '../TimeInput';

type Props = {
  labels: [string, string];
  error: string;
  onChange: (date: DateTime) => void;
};

const DateTimePicker = ({ labels, error, onChange }: Props) => {
  const [dateLabel, timeLabel] = labels;
  const [date, setDate] = useState<DateTime>();

  const handleChange = (updated: DateObject) => {
    const prevValue = date?.toObject() || {};
    setDate(DateTime.fromObject({ ...prevValue, ...updated }));
  };

  useEffect(() => {
    if (date) {
      onChange(date);
    }
  }, [date]);

  return (
    <Wrapper>
      <FieldGroup>
        <DatePicker
          error={error}
          name={'date-picker'}
          label={dateLabel}
          date={date}
          onChange={handleChange}
        />
      </FieldGroup>
      <FieldGroup>
        <TimeInput
          name={'time-picker'}
          label={timeLabel}
          date={date}
          onChange={handleChange}
        />
      </FieldGroup>
    </Wrapper>
  );
};

export default DateTimePicker;

const Wrapper = styled.div`
  display: flex;
`;

const FieldGroup = styled.div`
  & ~ & {
    margin-left: 17px;
  }
`;
