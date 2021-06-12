import React, { FC, MouseEvent, useState, useCallback, useRef } from 'react';
import { areDateFragmentsValid } from '@beans/date-input';

import useEventListener from 'hooks/useEventListener';

import { DateTime, DateRenderProps } from '../../config/types';
import { Wrapper } from './styled';

type Props = {
  dateTime: DateTime;
  render: (props: DateRenderProps | { value: DateTime }) => JSX.Element;
  onChange: (value: DateTime) => void;
};

const Picker: FC<Props> = ({ dateTime, render, onChange }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isValid, setValid] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback((value: boolean) => {
    setIsOpen(value);
  }, []);

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

    setValid(isValid);
    onChange(value);

    if (!isValid) {
      setIsOpen(false);
    }
  }, []);

  useEventListener('mousedown', handleClickOutside);

  return (
    <Wrapper ref={wrapperRef}>
      {render({ isOpen, handleOpen, value: dateTime, isValid, handleChange })}
    </Wrapper>
  );
};

export default Picker;
