import React from 'react';
import { DateTime } from 'luxon';

import { renderWithTheme, fireEvent, screen } from 'utils/testUtils';

import DateTimePicker from './DateTimePicker';
import { Type } from '../../config/types';

describe('<DateTimePicker />', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  const props = {
    required: true,
    dateTime: {
      yyyy: '2020',
      mm: '12',
      dd: '3',
    },
    handleDateChange: jest.fn(),
  };

  describe('#render', () => {
    it('should render start DateTimePicker', () => {
      const { queryByTestId } = renderWithTheme(<DateTimePicker type={Type.TYPE_START} {...props} />);

      expect(queryByTestId('start-datetime-picker')).toBeInTheDocument();
    });

    it('should render end DateTimePicker', () => {
      const { queryByTestId } = renderWithTheme(<DateTimePicker type={Type.TYPE_END} {...props} />);

      expect(queryByTestId('end-datetime-picker')).toBeInTheDocument();
    });

    it('should display calendar on day input focus', () => {
      const { queryByTestId, getByLabelText } = renderWithTheme(<DateTimePicker type={Type.TYPE_START} {...props} />);

      fireEvent.focus(getByLabelText('day'));

      expect(queryByTestId('startDate-single-calendar')).toBeInTheDocument();
    });
  });

  describe('#useEffect', () => {
    it('should call onChange with updated value, if date input changes', () => {
      const expected = {
        yyyy: '2020',
        mm: '12',
        dd: '5',
      };

      renderWithTheme(<DateTimePicker type={Type.TYPE_START} {...props} />);
      fireEvent.change(screen.getByLabelText('day'), { target: { value: 5 } });

      expect(props.handleDateChange).toHaveBeenCalledTimes(1);
      expect(props.handleDateChange).toHaveBeenCalledWith(expected);
    });

    it('should call onChange with updated value, if time input changes', () => {
      const expected = {
        yyyy: '2020',
        mm: '12',
        dd: '17',
      };

      renderWithTheme(<DateTimePicker type={Type.TYPE_START} {...props} />);
      fireEvent.change(screen.getByLabelText('day'), {
        target: { value: 17 },
      });

      expect(props.handleDateChange).toHaveBeenCalledTimes(1);
      expect(props.handleDateChange).toHaveBeenCalledWith(expected);
    });

    it('should not call onChange, if updated value is equal to previous value', () => {
      renderWithTheme(<DateTimePicker type={Type.TYPE_START} {...props} />);
      fireEvent.change(screen.getByLabelText('day'), {
        target: { value: 3 },
      });

      expect(props.handleDateChange).not.toHaveBeenCalled();
    });

    it('should not call onChange, if time fragment is not filled', () => {
      renderWithTheme(<DateTimePicker type={Type.TYPE_START} {...props} />);
      fireEvent.change(screen.getByLabelText('day'), { target: { value: 1 } });

      expect(props.handleDateChange).toHaveBeenCalledTimes(1);
    });
  });
});
