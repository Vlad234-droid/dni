import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
  Fragment,
  FC,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
  MouseEvent,
  ReactElement,
  ComponentProps,
} from 'react';
import Input from '@beans/input';
import Icon from '@beans/icon';

import {
  timeFormatOrder,
  isKeyForbidden,
  shouldFocusOnPrevInput,
  shouldFocusOnNextInput,
  getKey,
  isLastTimeFragment,
  getAriaLabel,
  isFragmentFilled,
  getTimeValidationObject,
  isTypedValueInvalid,
  getStringWithLeadingZero,
} from '../../utils';
import { Time, TimePart } from '../../config/types';
import {
  TIME_FORMAT,
  TIME_FRAGMENT_NAMES,
  TIME_FRAGMENTS_PLACEHOLDER as PLACEHOLDER,
  VISIBLE_TIME_SEPARATOR,
} from '../../config/dateTime';
import {
  SingleContainer,
  DateSeparator,
  IconWrapper,
  fragmentStyles,
} from './styled';

type Props = {
  time: Time;
  id: string;
  onTimeInputChange: ({
    valid,
    time,
  }: {
    valid: { hh: boolean; mm: boolean };
    time: Time;
  }) => void;
  onIconClick: () => void;
  error: boolean;
  name: string;
};

const TimeInput: FC<Props> = ({
  time,
  onIconClick,
  name,
  id,
  error,
  onTimeInputChange,
}) => {
  const inputRefs = useRef(new Map());
  const [isInputInFocus, setInputInFocus] = useState(false);
  const [timeSelected, setTimeSelected] = useState(time);

  const memoizedFragments = useMemo(() => timeFormatOrder(TIME_FORMAT), []);
  const memoizedAriaLabel = useMemo(() => getAriaLabel(time), [time]);
  const memoizedRenderSeparator = useMemo(
    () => (index: number) =>
      !isLastTimeFragment(index, memoizedFragments) && (
        <DateSeparator>{VISIBLE_TIME_SEPARATOR}</DateSeparator>
      ),
    [],
  );
  const memoizedRenderInput = useMemo(
    () => (props: ComponentProps<typeof Input>) => <Input {...props} />,
    [],
  );

  useEffect(() => {
    setTimeSelected(time);
  }, [time]);

  const handleInputChange = useCallback(
    (fragmentType: TimePart, index: number) => (
      event: ChangeEvent<HTMLElement>,
    ) => {
      event.preventDefault();

      const element = event.target as HTMLInputElement;
      const value = element.value;

      // stop here if user is typing something other than numbers
      if (isTypedValueInvalid(value)) return;

      const updatedTimeValue = { ...timeSelected, [fragmentType]: value };
      const validationResult = getTimeValidationObject(updatedTimeValue);

      setTimeSelected(updatedTimeValue);
      onTimeInputChange({
        valid: validationResult,
        time: updatedTimeValue,
      });

      if (
        isFragmentFilled(
          index,
          updatedTimeValue,
          memoizedFragments,
          fragmentType,
        )
      ) {
        focusOnNextInput(index);
      }
    },
    [timeSelected],
  );

  // if focusOnNextInput is called, than handleOnBlur gets old value of timeSelected
  // that is why it relies on actual value
  const handleOnBlur = useCallback(
    (fragmentType: string) => (event: FocusEvent<HTMLElement>) => {
      event.preventDefault();

      setInputInFocus(false);

      const element = event.target as HTMLInputElement;
      const value = element.value;

      // if values is shorter than expected, add leading zero
      if (value.length < 2) {
        setTimeSelected({
          ...timeSelected,
          [fragmentType]: getStringWithLeadingZero(value),
        });
      }
    },
    [timeSelected, time],
  );

  const handleOnFocus = useCallback((event: FocusEvent<HTMLElement>) => {
    event.preventDefault();

    const element = event.currentTarget as HTMLInputElement;

    setInputInFocus(true);
    element.select();
  }, []);

  const handleIconClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();

      onIconClick();
    },
    [onIconClick],
  );

  const focusOnNextInput = useCallback((index) => {
    const inputRef = inputRefs.current.get(index + 1);

    if (!inputRef) return;

    inputRef.focus({ preventScroll: true });
  }, []);

  const focusOnPrevInput = useCallback((index) => {
    const inputRef = inputRefs.current.get(index - 1);

    if (!inputRef) return;

    inputRef.focus({ preventScroll: true });
  }, []);

  const getInputDomRef = useCallback(
    (fragmentType, index) => (element: ReactElement) => {
      if (element) {
        inputRefs.current.set(index, element);
      }
    },
    [],
  );

  const handleKeyDown = useCallback(
    (index) => (event: KeyboardEvent<HTMLElement>) => {
      const key = getKey(event);

      if (isKeyForbidden(key)) {
        event.preventDefault();
        return;
      }

      const element = event.target as HTMLInputElement;

      if (shouldFocusOnPrevInput(key, element)) {
        focusOnPrevInput(index);
      } else if (shouldFocusOnNextInput(key, element)) {
        focusOnNextInput(index);
      }
    },
    [],
  );

  const getAriaDescribedBy = useCallback(
    () => (error && `${id}-error`) || undefined,
    [error],
  );

  const memoizedInputFragments = useMemo(
    () =>
      memoizedFragments.map((fragmentType, index) => (
        <Fragment key={PLACEHOLDER[fragmentType]}>
          {memoizedRenderInput({
            'aria-describedby': getAriaDescribedBy(),
            'aria-invalid': error,
            'aria-label': TIME_FRAGMENT_NAMES[fragmentType],
            placeholder: PLACEHOLDER[fragmentType],
            styles: fragmentStyles[fragmentType],
            autoComplete: 'off',
            maxLength: fragmentType.length,
            name: `${name}-${fragmentType}`,
            value: timeSelected[fragmentType],
            onFocus: handleOnFocus,
            onChange: handleInputChange(fragmentType, index),
            onBlur: handleOnBlur(fragmentType),
            onKeyDown: handleKeyDown(index),
            domRef: getInputDomRef(fragmentType, index),
            bare: true,
            className: `beans-time-input__${fragmentType}`,
          })}
          {memoizedRenderSeparator(index)}
        </Fragment>
      )),
    [name, timeSelected],
  );

  return (
    <SingleContainer
      focus={isInputInFocus}
      aria-label={memoizedAriaLabel}
      error={error}
    >
      {memoizedInputFragments}
      <IconWrapper onClick={handleIconClick}>
        <Icon graphic='openingHours' size='sm' />
      </IconWrapper>
    </SingleContainer>
  );
};

export default TimeInput;
