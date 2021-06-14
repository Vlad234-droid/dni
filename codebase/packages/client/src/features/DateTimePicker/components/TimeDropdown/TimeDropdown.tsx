import React, {
  FC,
  MouseEvent,
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
import {
  isTimeOptionActive,
  getIndexOfTimeOption,
  getKey,
  getTimeWithLeadingZero,
} from '../../utils';
import { Wrapper, Item } from './styled';

type Props = {
  options: Array<Time>;
  onSelect: (option: Time) => void;
  onEnter: () => void;
  selectedTime: Time;
  id: string;
};

const TimeDropdown: FC<Props> = ({
  options,
  onSelect,
  selectedTime,
  onEnter,
  id,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const memoizedIsOptionActive = useCallback(
    (option) => isTimeOptionActive(selectedTime, option),
    [selectedTime],
  );

  useEffect(() => {
    focusOnWrapper();
  }, []);

  const focusOnWrapper = useCallback(() => {
    wrapperRef.current && wrapperRef.current.focus();
  }, []);

  const handleTimeSelect = useCallback((event: MouseEvent, option: Time) => {
    event.preventDefault();
    event.stopPropagation();

    onSelect(getTimeWithLeadingZero(option));
  }, []);

  const handleKeyboardNavigation = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const key = getKey(event);
      let newOption;

      switch (key) {
        case UP_ARROW:
          event.preventDefault();

          newOption = options[getIndexOfTimeOption(options, selectedTime) - 1];
          newOption && onSelect(getTimeWithLeadingZero(newOption));
          break;

        case DOWN_ARROW:
          event.preventDefault();

          newOption = options[getIndexOfTimeOption(options, selectedTime) + 1];
          newOption && onSelect(getTimeWithLeadingZero(newOption));
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
    <Wrapper
      data-testid={`${id}-dropdown`}
      ref={wrapperRef}
      tabIndex={0}
      onKeyDown={handleKeyboardNavigation}
    >
      {options.map((option) => (
        <Item
          data-testid={`${id}-dropdown-item-${option[HOUR_KEY]}`}
          active={memoizedIsOptionActive(option)}
          key={option[HOUR_KEY]}
          onClick={(event: MouseEvent<HTMLElement>) =>
            handleTimeSelect(event, option)
          }
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
