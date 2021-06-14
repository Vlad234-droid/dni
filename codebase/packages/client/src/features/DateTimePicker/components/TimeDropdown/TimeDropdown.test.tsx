import React from 'react';

import {
  renderWithTheme,
  fireEvent,
  screen,
  createEvent,
} from 'utils/testUtils';

import TimeDropdown from './TimeDropdown';

describe('<TimeDropdown />', () => {
  const props = {
    options: [
      { hh: '9', mm: '00' },
      { hh: '10', mm: '00' },
      { hh: '11', mm: '00' },
    ],
    onSelect: jest.fn(),
    selectedTime: { hh: '9', mm: '00' },
    onEnter: jest.fn(),
    id: 'mocked_id',
  };

  describe('#render', () => {
    it('should render the list of options', () => {
      const { getByText } = renderWithTheme(<TimeDropdown {...props} />);

      props.options.forEach((option) => {
        expect(getByText(option.hh)).toBeInTheDocument();
      });
    });

    it('should render an active option', () => {
      const { getByTestId } = renderWithTheme(<TimeDropdown {...props} />);
      const style = window.getComputedStyle(
        getByTestId(`mocked_id-dropdown-item-${props.selectedTime.hh}`),
      );

      expect(style.background).not.toBe('transparent');
    });
  });

  describe('#useEffect', () => {
    it('should focus on wrapper', () => {
      const { getByTestId } = renderWithTheme(<TimeDropdown {...props} />);

      expect(getByTestId('mocked_id-dropdown')).toBe(document.activeElement);
    });
  });

  describe('#handleTimeSelect', () => {
    it('should call event.preventDefault', () => {
      renderWithTheme(<TimeDropdown {...props} />);
      const element = screen.getByText('10');
      const clickEvent = createEvent.click(element);
      fireEvent(element, clickEvent);

      expect(clickEvent.defaultPrevented).toBe(true);
    });

    it('should call props.onSelect', () => {
      renderWithTheme(<TimeDropdown {...props} />);
      fireEvent.click(screen.getByText('9'));

      expect(props.onSelect).toHaveBeenCalledWith({ hh: '09', mm: '00' });
    });
  });

  describe('#handleKeyboardNavigation', () => {
    it('should call event.preventDefault on UP_ARROW', () => {
      const eventData = {
        key: 'ArrowUp',
        code: 'ArrowUp',
        keyCode: 38,
        charCode: 38,
      };

      renderWithTheme(<TimeDropdown {...props} />);
      const element = screen.getByTestId('mocked_id-dropdown');
      const keyDownEvent = createEvent.keyDown(element, eventData);
      fireEvent(element, keyDownEvent);

      expect(keyDownEvent.defaultPrevented).toBe(true);
    });

    it('should not call props.onSelect on UP_ARROW, if the first option is selected', () => {
      const eventData = {
        key: 'ArrowUp',
        code: 'ArrowUp',
        keyCode: 38,
        charCode: 38,
      };

      renderWithTheme(<TimeDropdown {...props} />);
      fireEvent.keyDown(screen.getByTestId('mocked_id-dropdown'), eventData);

      expect(props.onSelect).not.toHaveBeenCalled();
    });

    it('should call props.onSelect on UP_ARROW, if not the first option is selected', () => {
      const eventData = {
        key: 'ArrowUp',
        code: 'ArrowUp',
        keyCode: 38,
        charCode: 38,
      };
      const newProps = {
        ...props,
        selectedTime: { hh: '10', mm: '00' },
      };
      renderWithTheme(<TimeDropdown {...newProps} />);
      fireEvent.keyDown(screen.getByTestId('mocked_id-dropdown'), eventData);

      expect(props.onSelect).toHaveBeenCalledWith({ hh: '09', mm: '00' });
    });

    it('should call event.preventDefault on DOWN_ARROW', () => {
      const eventData = {
        key: 'ArrowDown',
        code: 'ArrowDown',
        keyCode: 40,
        charCode: 40,
      };

      renderWithTheme(<TimeDropdown {...props} />);
      const element = screen.getByTestId('mocked_id-dropdown');
      const keyDownEvent = createEvent.keyDown(element, eventData);
      fireEvent(element, keyDownEvent);

      expect(keyDownEvent.defaultPrevented).toBe(true);
    });

    it('should not call props.onSelect on DOWN_ARROW, if the last option is selected', () => {
      const eventData = {
        key: 'ArrowDown',
        code: 'ArrowDown',
        keyCode: 40,
        charCode: 40,
      };
      const newProps = {
        ...props,
        selectedTime: { hh: '11', mm: '00' },
      };

      renderWithTheme(<TimeDropdown {...newProps} />);
      fireEvent.keyDown(screen.getByTestId('mocked_id-dropdown'), eventData);

      expect(props.onSelect).not.toHaveBeenCalled();
    });

    it('should call props.onSelect on DOWN_ARROW, if not the last option is selected', () => {
      const eventData = {
        key: 'ArrowDown',
        code: 'ArrowDown',
        keyCode: 40,
        charCode: 40,
      };

      renderWithTheme(<TimeDropdown {...props} />);
      fireEvent.keyDown(screen.getByTestId('mocked_id-dropdown'), eventData);

      expect(props.onSelect).toHaveBeenCalledWith({ hh: '10', mm: '00' });
    });

    it('should call event.preventDefault on ENTER', () => {
      const eventData = {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        charCode: 13,
      };

      renderWithTheme(<TimeDropdown {...props} />);
      const element = screen.getByTestId('mocked_id-dropdown');
      const keyDownEvent = createEvent.keyDown(element, eventData);
      fireEvent(element, keyDownEvent);

      expect(keyDownEvent.defaultPrevented).toBe(true);
    });

    it('should call props.onEnter on ENTER', () => {
      const eventData = {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        charCode: 13,
      };

      renderWithTheme(<TimeDropdown {...props} />);
      fireEvent.keyDown(screen.getByTestId('mocked_id-dropdown'), eventData);

      expect(props.onEnter).toHaveBeenCalled();
    });

    it('should not call event.preventDefault, on any other key pressed', () => {
      const eventData = {
        key: 'Backspace',
        code: 'Backspace',
        keyCode: 8,
        charCode: 8,
      };

      renderWithTheme(<TimeDropdown {...props} />);
      const element = screen.getByTestId('mocked_id-dropdown');
      const keyDownEvent = createEvent.keyDown(element, eventData);
      fireEvent(element, keyDownEvent);

      expect(keyDownEvent.defaultPrevented).toBe(false);
    });

    it('should not call props.onEnter, if key is not Enter', () => {
      const eventData = {
        key: 'ArrowDown',
        code: 'ArrowDown',
        keyCode: 40,
        charCode: 40,
      };

      renderWithTheme(<TimeDropdown {...props} />);
      fireEvent.keyDown(screen.getByTestId('mocked_id-dropdown'), eventData);

      expect(props.onEnter).not.toHaveBeenCalled();
    });

    it('should not call props.onSelect, if key is nor UP_ARROW, DOWN_ARROW', () => {
      const eventData = {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        charCode: 13,
      };

      renderWithTheme(<TimeDropdown {...props} />);
      fireEvent.keyDown(screen.getByTestId('mocked_id-dropdown'), eventData);

      expect(props.onSelect).not.toHaveBeenCalled();
    });
  });
});
