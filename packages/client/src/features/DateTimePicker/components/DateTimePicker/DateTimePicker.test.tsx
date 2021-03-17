import React from 'react';
import { DateTime } from 'luxon';

import { renderWithTheme, fireEvent, screen } from 'utils/testUtils';

import DateTimePicker from './DateTimePicker';
import { Type } from '../../config/types';

describe('<DateTimePicker />', () => {
  const props = {
    onChange: jest.fn(),
    isRangeValid: true,
    required: true,
    dateTime: {
      year: 2020,
      month: 12,
      day: 3,
      hour: 13,
      minute: 30,
    },
  };

  describe('#render', () => {
    it('should render start DateTimePicker', () => {
      const { queryByTestId } = renderWithTheme(
        <DateTimePicker type={Type.TYPE_START} {...props} />,
      );

      expect(queryByTestId('start-datetime-picker')).toBeInTheDocument();
    });

    it('should render end DateTimePicker', () => {
      const { queryByTestId } = renderWithTheme(
        <DateTimePicker type={Type.TYPE_END} {...props} />,
      );

      expect(queryByTestId('end-datetime-picker')).toBeInTheDocument();
    });

    it('should display calendar on day input focus', () => {
      const { queryByTestId, getByLabelText } = renderWithTheme(
        <DateTimePicker type={Type.TYPE_START} {...props} />,
      );

      fireEvent.focus(getByLabelText('day'));

      expect(queryByTestId('startDate-single-calendar')).toBeInTheDocument();
    });

    it('should display/hide time dropdown on input time icon click', () => {
      const { getByTestId, queryByTestId } = renderWithTheme(
        <DateTimePicker type={Type.TYPE_START} {...props} />,
      );

      fireEvent.click(getByTestId('startTime-input-icon'));

      expect(queryByTestId('startTime-dropdown')).toBeInTheDocument();

      fireEvent.click(getByTestId('startTime-input-icon'));

      expect(queryByTestId('startTime-dropdown')).not.toBeInTheDocument();
    });
  });

  describe('#useEffect', () => {
    it('should call onChange with updated value, if date input changes', () => {
      const expected = DateTime.fromObject({
        year: 2020,
        month: 12,
        day: 5,
        hour: 13,
        minute: 30,
      });

      renderWithTheme(<DateTimePicker type={Type.TYPE_START} {...props} />);
      fireEvent.change(screen.getByLabelText('day'), { target: { value: 5 } });

      expect(props.onChange).toHaveBeenCalledTimes(2);
      expect(props.onChange).toHaveBeenCalledWith(expected);
    });

    it('should call onChange with updated value, if time input changes', () => {
      const expected = DateTime.fromObject({
        year: 2020,
        month: 12,
        day: 3,
        hour: 17,
        minute: 30,
      });

      renderWithTheme(<DateTimePicker type={Type.TYPE_START} {...props} />);
      fireEvent.change(screen.getByLabelText('hour'), {
        target: { value: 17 },
      });

      expect(props.onChange).toHaveBeenCalledTimes(2);
      expect(props.onChange).toHaveBeenCalledWith(expected);
    });

    it('should not call onChange, if updated value is equal to previous value', () => {
      renderWithTheme(<DateTimePicker type={Type.TYPE_START} {...props} />);
      fireEvent.change(screen.getByLabelText('hour'), {
        target: { value: 13 },
      });

      expect(props.onChange).toHaveBeenCalledTimes(1);
    });

    it('should not call onChange, if time fragment is not filled', () => {
      renderWithTheme(<DateTimePicker type={Type.TYPE_START} {...props} />);
      fireEvent.change(screen.getByLabelText('hour'), { target: { value: 1 } });

      expect(props.onChange).toHaveBeenCalledTimes(1);
    });
  });
});
