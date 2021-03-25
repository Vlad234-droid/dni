import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DateTime, DateObject } from 'luxon';

import useRegisterField from 'hooks/useRegisterField';

import { Registrable } from '../FieldWrapper';
import DatePicker from '../DatePicker';
import TimeInput from '../TimeInput';

type Props = {
  labels: [string, string];
  name: string;
  error: string;
};

const DateTimePicker = ({
  labels,
  name,
  setValue,
  error,
  ...methods
}: Props & Registrable) => {
  const [dateLabel, timeLabel] = labels;
  const [date, setDate] = useState<DateTime>();
  useRegisterField(methods, name);

  const handleChange = (updated: DateObject) => {
    const prevValue = date?.toObject() || {};
    setDate(DateTime.fromObject({ ...prevValue, ...updated }));
  };

  useEffect(() => {
    if (date) {
      setValue(name, date);
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
