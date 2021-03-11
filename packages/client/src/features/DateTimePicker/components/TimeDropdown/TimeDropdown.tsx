import React, {
  FC,
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { UP_ARROW, DOWN_ARROW, ENTER } from '@beans/constants';

import {
  HOUR_KEY,
  MINUTE_KEY,
  VISIBLE_TIME_SEPARATOR,
} from '../../config/dateTime';
import { Time } from '../../config/types';
import { isTimeOptionActive, getIndexOfTimeOption } from '../../utils';
import { Wrapper, Item } from './styled';

type Props = {
  options: Array<Time>;
  onSelect: (option: Time) => void;
  onEnter: () => void;
  selectedTime: Time;
};

const TimeDropdown: FC<Props> = ({
  options,
  onSelect,
  selectedTime,
  onEnter,
}) => {
  const optionRefs = useRef(new Map());
  const wrapperRef = useRef<HTMLDivElement>(null);

  const memoizedIsOptionActive = useCallback(
    (option) => isTimeOptionActive(selectedTime, option),
    [selectedTime],
  );

  useEffect(() => {
    focusOnWrapper();
    focusOnOption(selectedTime);
  }, []);

  const focusOnWrapper = useCallback(() => {
    wrapperRef.current && wrapperRef.current.focus();
  }, []);

  const focusOnOption = useCallback(
    (option: Time) => {
      const { hh } = option;
      const optionRefRef = optionRefs.current.get(hh);

      if (!optionRefRef) return;

      optionRefRef.focus();
    },
    [selectedTime],
  );

  const handleTimeSelect = useCallback((event, option: Time) => {
    event.preventDefault();
    event.stopPropagation();

    focusOnOption(option);
    onSelect(option);
  }, []);

  const getOptionRef = useCallback(
    (hh: string) => (element: HTMLElement) => {
      optionRefs.current.set(hh, element);
    },
    [],
  );

  const handleKeyboardNavigation = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const { keyCode } = event;
      let newOption;

      switch (keyCode) {
        case UP_ARROW:
          event.preventDefault();

          newOption = options[getIndexOfTimeOption(options, selectedTime) - 1];
          newOption && onSelect(newOption);
          break;

        case DOWN_ARROW:
          event.preventDefault();

          newOption = options[getIndexOfTimeOption(options, selectedTime) + 1];
          newOption && onSelect(newOption);
          break;

        case ENTER:
          event.preventDefault();

          onEnter();
          break;
      }
    },
    [options, selectedTime],
  );

  return (
    <Wrapper ref={wrapperRef} tabIndex={0} onKeyDown={handleKeyboardNavigation}>
      {options.map((option) => (
        //@ts-ignore:
        <Item
          onClick={(event: ChangeEvent<HTMLElement>) =>
            handleTimeSelect(event, option)
          }
          ref={getOptionRef(option[HOUR_KEY])}
          active={memoizedIsOptionActive(option)}
          key={option[HOUR_KEY]}
        >
          <span>{option[HOUR_KEY]}</span>
          <span>{VISIBLE_TIME_SEPARATOR}</span>
          <span>{option[MINUTE_KEY]}</span>
        </Item>
      ))}
    </Wrapper>
  );
};

export default TimeDropdown;
