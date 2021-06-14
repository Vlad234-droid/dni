import React from 'react';

import {
  createEvent,
  fireEvent,
  renderWithTheme,
  screen,
} from 'utils/testUtils';

import TimeInput from './TimeInput';

describe('<TimeInput />', () => {
  const props = {
    time: { hh: '', mm: '' },
    id: 'mocked_id',
    onTimeInputChange: jest.fn(),
    onIconClick: jest.fn(),
    error: false,
    name: 'mocked_time_input_name',
  };

  describe('#render', () => {
    it('should render expected elements', () => {
      const { getByTestId } = renderWithTheme(<TimeInput {...props} />);

      expect(getByTestId('mocked_id-input-icon')).toBeInTheDocument();
      expect(getByTestId('mocked_id-input-hh')).toBeInTheDocument();
      expect(getByTestId('mocked_id-input-mm')).toBeInTheDocument();
    });

    it('should render all time separators', () => {
      const { getAllByTestId } = renderWithTheme(<TimeInput {...props} />);
      const separators = getAllByTestId('mocked_id-separator');

      expect(separators.length).toBe(1);
    });
  });

  describe('#useEffect', () => {
    it('should set timeSelected based on props.time', () => {
      const newProps = {
        ...props,
        time: { hh: '10', mm: '00' },
      };

      const { getByDisplayValue } = renderWithTheme(
        <TimeInput {...newProps} />,
      );

      expect(getByDisplayValue('10')).toBeInTheDocument();
    });
  });

  describe('#handleInputChange', () => {
    it('should not call props.onTimeInputChange, if value is not a number', () => {
      renderWithTheme(<TimeInput {...props} />);

      fireEvent.change(screen.getByTestId('mocked_id-input-hh'), {
        target: { value: 'abs' },
      });

      expect(props.onTimeInputChange).not.toHaveBeenCalled();
    });

    it('should update timeSelected, and call props.onTimeInputChange, if typed a number', () => {
      const expected = {
        valid: {
          hh: true,
          mm: true,
        },
        time: {
          hh: '5',
          mm: '',
        },
      };
      const { getByDisplayValue } = renderWithTheme(<TimeInput {...props} />);

      fireEvent.change(screen.getByTestId('mocked_id-input-hh'), {
        target: { value: 5 },
      });

      expect(getByDisplayValue('5')).toBeInTheDocument();
      expect(props.onTimeInputChange).toHaveBeenCalledWith(expected);
    });

    it('should update timeSelected, and call props.onTimeInputChange, if typed invalid number', () => {
      const expected = {
        valid: {
          hh: false,
          mm: true,
        },
        time: {
          hh: '95',
          mm: '',
        },
      };
      const { getByDisplayValue } = renderWithTheme(<TimeInput {...props} />);

      fireEvent.change(screen.getByTestId('mocked_id-input-hh'), {
        target: { value: 95 },
      });

      expect(getByDisplayValue('95')).toBeInTheDocument();
      expect(props.onTimeInputChange).toHaveBeenCalledWith(expected);
    });

    it('should focus on next input if fragment is not last and filled', () => {
      const { getByTestId } = renderWithTheme(<TimeInput {...props} />);

      fireEvent.change(screen.getByTestId('mocked_id-input-hh'), {
        target: { value: 12 },
      });

      expect(getByTestId('mocked_id-input-mm')).toBe(document.activeElement);
    });

    it('should not focus on next input if fragment is not filled', () => {
      const { getByTestId } = renderWithTheme(<TimeInput {...props} />);

      fireEvent.change(screen.getByTestId('mocked_id-input-hh'), {
        target: { value: 2 },
      });

      expect(getByTestId('mocked_id-input-mm')).not.toBe(
        document.activeElement,
      );
    });
  });

  describe('#handleIconClick', () => {
    it('should call event.preventDefault on icon click', () => {
      renderWithTheme(<TimeInput {...props} />);

      const element = screen.getByTestId('mocked_id-input-icon');
      const clickEvent = createEvent.click(element);
      fireEvent(element, clickEvent);

      expect(clickEvent.defaultPrevented).toBe(true);
    });

    it('should call props.onIconClick', () => {
      const { getByTestId } = renderWithTheme(<TimeInput {...props} />);

      fireEvent.click(getByTestId('mocked_id-input-icon'));

      expect(props.onIconClick).toHaveBeenCalled();
    });
  });

  describe('#handleKeyDown', () => {
    it('should call event.preventDefault on leftArrow', () => {
      const eventData = {
        key: 'ArrowLeft',
        code: 'ArrowLeft',
        keyCode: 37,
        charCode: 37,
      };

      renderWithTheme(<TimeInput {...props} />);

      const element = screen.getByTestId('mocked_id-input-mm');
      const keyDownEvent = createEvent.keyDown(element, eventData);
      fireEvent(element, keyDownEvent);

      expect(keyDownEvent.defaultPrevented).toBe(true);
    });

    it('should focus on prev input, if leftArrow pressed', () => {
      const eventData = {
        key: 'ArrowLeft',
        code: 'ArrowLeft',
        keyCode: 37,
        charCode: 37,
      };

      renderWithTheme(<TimeInput {...props} />);

      const element = screen.getByTestId('mocked_id-input-mm');
      const keyDownEvent = createEvent.keyDown(element, eventData);
      fireEvent(element, keyDownEvent);

      expect(screen.getByTestId('mocked_id-input-hh')).toBe(
        document.activeElement,
      );
    });

    it('should not focus on prev input, if any other key pressed', () => {
      const eventData = {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        charCode: 13,
      };

      renderWithTheme(<TimeInput {...props} />);

      const element = screen.getByTestId('mocked_id-input-mm');
      const keyDownEvent = createEvent.keyDown(element, eventData);
      fireEvent(element, keyDownEvent);

      expect(screen.getByTestId('mocked_id-input-hh')).not.toBe(
        document.activeElement,
      );
    });

    it('should call event.preventDefault on rightArrow', () => {
      const eventData = {
        key: 'ArrowRight',
        code: 'ArrowRight',
        keyCode: 39,
        charCode: 39,
      };

      renderWithTheme(<TimeInput {...props} />);

      const element = screen.getByTestId('mocked_id-input-hh');
      const keyDownEvent = createEvent.keyDown(element, eventData);
      fireEvent(element, keyDownEvent);

      expect(keyDownEvent.defaultPrevented).toBe(true);
    });

    it('should focus on next input, if rightArrow pressed', () => {
      const eventData = {
        key: 'ArrowRight',
        code: 'ArrowRight',
        keyCode: 39,
        charCode: 39,
      };

      renderWithTheme(<TimeInput {...props} />);

      const element = screen.getByTestId('mocked_id-input-hh');
      const keyDownEvent = createEvent.keyDown(element, eventData);
      fireEvent(element, keyDownEvent);

      expect(screen.getByTestId('mocked_id-input-mm')).toBe(
        document.activeElement,
      );
    });

    it('should not focus on next input, if any other key pressed', () => {
      const eventData = {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        charCode: 13,
      };

      renderWithTheme(<TimeInput {...props} />);

      const element = screen.getByTestId('mocked_id-input-hh');
      const keyDownEvent = createEvent.keyDown(element, eventData);
      fireEvent(element, keyDownEvent);

      expect(screen.getByTestId('mocked_id-input-mm')).not.toBe(
        document.activeElement,
      );
    });
  });
});
