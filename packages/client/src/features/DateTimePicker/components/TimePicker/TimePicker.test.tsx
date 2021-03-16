import React from 'react';

import {
  renderWithTheme,
  cleanupAfterEach,
  fireEvent,
  screen,
} from 'utils/testUtils';

import TimePicker from './TimePicker';

describe('<TimePicker/>', () => {
  cleanupAfterEach();

  const props = {
    id: 'mocked_id',
    name: 'mocked_time_picker_name',
    labelText: 'mocked_time_picker_label_text',
    required: true,
    isDropdownOpen: false,
    onDropdownToggle: jest.fn(),
    onTimeChange: jest.fn(),
    isTimeValid: true,
    time: { hh: '', mm: '' },
    errorMessage: 'mocked_time_error_message',
  };

  describe('#render', () => {
    it('should render FormGroup and TimeInput', () => {
      const { getByTestId } = renderWithTheme(<TimePicker {...props} />);

      expect(getByTestId('mocked_id-input-group')).toBeInTheDocument();
    });

    it('should render TimeDropdown, if props.isDropdownOpen is true', () => {
      const newProps = {
        ...props,
        isDropdownOpen: true,
      };
      const { getByTestId } = renderWithTheme(<TimePicker {...newProps} />);

      expect(getByTestId('mocked_id-dropdown')).toBeInTheDocument();
    });

    it('should render with value', () => {
      const newProps = {
        ...props,
        time: {
          hh: '10',
          mm: '15',
        },
      };
      const { getByDisplayValue } = renderWithTheme(
        <TimePicker {...newProps} />,
      );

      expect(getByDisplayValue('10')).toBeInTheDocument();
      expect(getByDisplayValue('15')).toBeInTheDocument();
    });

    it('should render (optional) text, if required is false', () => {
      const newProps = {
        ...props,
        required: false,
      };
      const { getByText } = renderWithTheme(<TimePicker {...newProps} />);

      expect(getByText('(optional)')).toBeInTheDocument();
    });

    it('should render error message text, if time is invalid', () => {
      const newProps = {
        ...props,
        isTimeValid: false,
      };
      const { getByText } = renderWithTheme(<TimePicker {...newProps} />);

      expect(getByText('mocked_time_error_message')).toBeInTheDocument();
    });
  });

  describe('#handleDropdownClose', () => {
    it('should call props.onDropdownToggle on enter', () => {
      const eventData = {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        charCode: 13,
      };
      const newProps = {
        ...props,
        isDropdownOpen: true,
      };

      renderWithTheme(<TimePicker {...newProps} />);
      fireEvent.keyDown(screen.getByTestId('mocked_id-dropdown'), eventData);

      expect(props.onDropdownToggle).toHaveBeenCalledWith(false);
    });
  });

  describe('#handleIconClick', () => {
    it('should call onDropdownToggle with true, if isDropdownOpen is false', () => {
      renderWithTheme(<TimePicker {...props} />);
      fireEvent.click(screen.getByTestId('mocked_id-input-icon'));

      expect(props.onDropdownToggle).toHaveBeenCalledWith(true);
    });

    it('should call onDropdownToggle with false, if isDropdownOpen is true', () => {
      const newProps = {
        ...props,
        isDropdownOpen: true,
      };

      renderWithTheme(<TimePicker {...newProps} />);
      fireEvent.click(screen.getByTestId('mocked_id-input-icon'));

      expect(props.onDropdownToggle).toHaveBeenCalledWith(false);
    });

    it('should not call onDropdownToggle, if isTimeValid is false', () => {
      const newProps = {
        ...props,
        isTimeValid: false,
      };

      renderWithTheme(<TimePicker {...newProps} />);
      fireEvent.click(screen.getByTestId('mocked_id-input-icon'));

      expect(props.onDropdownToggle).not.toHaveBeenCalled();
    });
  });

  describe('#handleSelect', () => {
    it('should call props.onTimeChange with validation and value', () => {
      const expected = {
        valid: {
          hh: true,
          mm: true,
        },
        value: {
          hh: '10',
          mm: '00',
        },
      };

      const newProps = {
        ...props,
        isDropdownOpen: true,
      };

      renderWithTheme(<TimePicker {...newProps} />);
      fireEvent.click(screen.getByText('10'));

      expect(props.onTimeChange).toHaveBeenCalledWith(expected);
    });
  });

  describe('#handleInputChange', () => {
    it('should call onTimeChange with value and validation', () => {
      const expected = {
        valid: {
          hh: true,
          mm: true,
        },
        value: {
          hh: '5',
          mm: '',
        },
      };

      renderWithTheme(<TimePicker {...props} />);
      fireEvent.change(screen.getByLabelText('hour'), { target: { value: 5 } });

      expect(props.onTimeChange).toHaveBeenCalledWith(expected);
    });

    it('should call onTimeChange with value and validation, if hh is not valid', () => {
      const expected = {
        valid: {
          hh: false,
          mm: true,
        },
        value: {
          hh: '47',
          mm: '',
        },
      };

      renderWithTheme(<TimePicker {...props} />);
      fireEvent.change(screen.getByLabelText('hour'), {
        target: { value: 47 },
      });

      expect(props.onTimeChange).toHaveBeenCalledWith(expected);
    });

    it('should call onTimeChange with value and validation, if mm is not valid', () => {
      const expected = {
        valid: {
          hh: true,
          mm: false,
        },
        value: {
          hh: '',
          mm: '93',
        },
      };

      renderWithTheme(<TimePicker {...props} />);
      fireEvent.change(screen.getByLabelText('minute'), {
        target: { value: 93 },
      });

      expect(props.onTimeChange).toHaveBeenCalledWith(expected);
    });
  });
});
