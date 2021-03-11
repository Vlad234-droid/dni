import React, { FC, MouseEvent, useState, useCallback, useRef } from 'react';
import { areDateFragmentsValid } from '@beans/date-input';

import useEventListener from 'hooks/useEventListener';

import { Wrapper } from './styled';
import { DateTime, TimeRenderProps, DateRenderProps } from '../../config/types';

// TODO: fix types
type Props = {
  dateTime: DateTime;
  render: (
    props: DateRenderProps | TimeRenderProps | { value: DateTime },
  ) => JSX.Element;
};

const Picker: FC<Props> = ({ dateTime, render }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isValid, setValid] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(dateTime);

  const handleClickOutside = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const element = event?.target as HTMLElement;

      if (isOpen && !wrapperRef.current?.contains(element)) {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  const handleChange = useCallback(({ valid, value }) => {
    const isValid = areDateFragmentsValid(valid);

    setValue(value);
    setValid(isValid);

    if (!isValid) {
      setIsOpen(false);
    }
  }, []);

  useEventListener('mousedown', handleClickOutside);

  return (
    <Wrapper ref={wrapperRef}>
      {render({ isOpen, setIsOpen, value, isValid, handleChange })}
    </Wrapper>
  );
};

export default Picker;
