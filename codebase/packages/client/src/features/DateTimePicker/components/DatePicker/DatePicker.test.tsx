import React from 'react';
import { DateTime } from 'luxon';

import { renderWithTheme, fireEvent, screen } from 'utils/testUtils';

import DatePicker from './DatePicker';
import { getStringWithLeadingZero } from '../../utils';

describe('<DatePicker />', () => {
  const props = {
    id: 'mocked_id',
    name: 'mocked_date_picker_name',
    labelText: 'mocked_date_picker_label_text',
    required: true,
    isCalendarOpen: true,
    isDateValid: true,
    date: { dd: '', mm: '', yyyy: '' },
    onCalendarToggle: jest.fn(),
    onDateChange: jest.fn(),
    errorMessage: 'mocked_date_error_message',
  };

  describe('#render', () => {
    it('should render DateInputGroup', () => {
      const { getByTestId } = renderWithTheme(<DatePicker {...props} />);

      expect(getByTestId('mocked_id-input-group')).toBeInTheDocument();
    });

    it('should render SingleCalendar, if props.isCalendarOpen is true', () => {
      const newProps = {
        ...props,
        isCalendarOpen: true,
      };
      const { getByTestId } = renderWithTheme(<DatePicker {...newProps} />);

      expect(getByTestId('mocked_id-single-calendar')).toBeInTheDocument();
    });

    it('should render with value', () => {
      const newProps = {
        ...props,
        date: {
          dd: '10',
          mm: '15',
          yyyy: '2020',
        },
      };
      const { getByDisplayValue } = renderWithTheme(
        <DatePicker {...newProps} />,
      );

      expect(getByDisplayValue('10')).toBeInTheDocument();
      expect(getByDisplayValue('15')).toBeInTheDocument();
      expect(getByDisplayValue('2020')).toBeInTheDocument();
    });

    it('should render (optional) text, if required is false', () => {
      const newProps = {
        ...props,
        required: false,
      };
      const { getByText } = renderWithTheme(<DatePicker {...newProps} />);

      expect(getByText('(optional)')).toBeInTheDocument();
    });

    it('should render error message, if date is invalid', () => {
      const newProps = {
        ...props,
        isDateValid: false,
      };
      const { getByText } = renderWithTheme(<DatePicker {...newProps} />);

      expect(getByText('mocked_date_error_message')).toBeInTheDocument();
    });
  });

  describe('#useEffect', () => {
    it('should call props.onCalendarToggle with false value', () => {
      renderWithTheme(<DatePicker {...props} />);

      expect(props.onCalendarToggle).toHaveBeenCalledWith(false);
    });
  });

  describe('#handleCalendarDateChange', () => {
    it('should call onDateChange with validation and value on calendar day click', () => {
      const now = DateTime.now();
      const newProps = {
        ...props,
        isCalendarOpen: true,
      };

      renderWithTheme(<DatePicker {...newProps} />);
      fireEvent.click(screen.getByText('12'));

      const expected = {
        valid: {
          dd: true,
          mm: true,
          yyyy: true,
        },
        value: {
          dd: '12',
          mm: getStringWithLeadingZero(now.month.toString()),
          yyyy: now.year.toString(),
        },
      };

      expect(props.onDateChange).toHaveBeenCalledWith(expected);
    });
  });

  describe('#handleOnFocus', () => {
    it('should call onCalendarToggle on input focus, if isDateValid', () => {
      renderWithTheme(<DatePicker {...props} />);
      fireEvent.focus(screen.getByLabelText('day'));

      expect(props.onCalendarToggle).toHaveBeenCalledWith(true);
      expect(props.onCalendarToggle).toHaveBeenCalledTimes(2);
    });

    it('should not call onCalendarToggle on input focus, if !isDateValid', () => {
      const newProps = {
        ...props,
        isDateValid: false,
      };

      renderWithTheme(<DatePicker {...newProps} />);
      fireEvent.focus(screen.getByLabelText('day'));

      expect(props.onCalendarToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('#handleInputChange', () => {
    it('should call onDateChange with validation and value', () => {
      const expected = {
        valid: {
          dd: true,
          mm: true,
          yyyy: true,
        },
        value: {
          dd: '5',
          mm: '',
          yyyy: '',
        },
      };

      renderWithTheme(<DatePicker {...props} />);
      fireEvent.change(screen.getByLabelText('day'), { target: { value: 5 } });

      expect(props.onDateChange).toHaveBeenCalledWith(expected);
    });
  });
});
