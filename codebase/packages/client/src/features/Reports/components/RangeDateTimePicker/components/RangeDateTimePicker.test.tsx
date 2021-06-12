import React from 'react';
import { DateTime } from 'luxon';

import { renderWithTheme, fireEvent, screen, within } from 'utils/testUtils';

import RangeDateTimePicker from './RangeDateTimePicker';

describe('<RangeDateTimePicker />', () => {
  describe('#render', () => {
    const props = {
      start: DateTime.fromObject({
        month: 12,
        day: 5,
        year: 2020,
        hour: 12,
        minute: 10,
      }),
      end: DateTime.fromObject({
        month: 12,
        day: 5,
        year: 2020,
        hour: 12,
        minute: 5,
      }),
    };

    it('should render an end time error message, if end dateTime equals to start dateTime', () => {
      const newProps = {
        ...props,
        end: DateTime.fromObject({
          month: 12,
          day: 5,
          year: 2020,
          hour: 12,
          minute: 10,
        }),
      };

      const { getByTestId } = renderWithTheme(<RangeDateTimePicker {...newProps} />);
      const { queryByText } = within(getByTestId('endTime-input-group'));

      expect(queryByText('Enter a valid time')).toBeInTheDocument();
    });

    it('should render an end time error message, if end dateTime < start dateTime', () => {
      const { getByTestId } = renderWithTheme(<RangeDateTimePicker {...props} />);
      const { queryByText } = within(getByTestId('endTime-input-group'));

      expect(queryByText('Enter a valid time')).toBeInTheDocument();
    });

    it('should not render a time error message, if end dateTime > start dateTime', () => {
      const newProps = {
        ...props,
        end: DateTime.fromObject({
          month: 12,
          day: 5,
          year: 2020,
          hour: 12,
          minute: 20,
        }),
      };

      const { getByTestId } = renderWithTheme(<RangeDateTimePicker {...newProps} />);
      const { queryByText } = within(getByTestId('endTime-input-group'));

      expect(queryByText('Enter a valid time')).not.toBeInTheDocument();
    });

    it('should render (optional) text, if required is false', () => {
      const props = {
        required: false,
      };

      const { queryAllByText } = renderWithTheme(<RangeDateTimePicker {...props} />);

      expect(queryAllByText('(optional)').length).toBe(4);
    });

    it('should not render (optional) text, if required is true', () => {
      const props = {
        required: true,
      };

      const { queryByText } = renderWithTheme(<RangeDateTimePicker {...props} />);

      expect(queryByText('(optional)')).not.toBeInTheDocument();
    });

    it('should not render (optional) text, if required is not passed', () => {
      const { queryByText } = renderWithTheme(<RangeDateTimePicker />);

      expect(queryByText('(optional)')).not.toBeInTheDocument();
    });
  });

  describe('#handleStartChange', () => {
    const props = {
      start: DateTime.fromObject({
        month: 12,
        day: 5,
        year: 2020,
        hour: 12,
        minute: 30,
      }),
      end: DateTime.fromObject({
        month: 12,
        day: 5,
        year: 2020,
        hour: 12,
        minute: 20,
      }),
    };

    it('should remove end time error, if it existed', () => {
      const { getByTestId } = renderWithTheme(<RangeDateTimePicker {...props} />);
      const { queryByText } = within(getByTestId('endTime-input-group'));

      expect(queryByText('Enter a valid time')).toBeInTheDocument();

      fireEvent.change(screen.getByTestId('startTime-input-mm'), {
        target: { value: 15 },
      });

      expect(queryByText('Enter a valid time')).not.toBeInTheDocument();
    });

    it('should display start time error, if start = end', () => {
      const newProps = {
        ...props,
        end: DateTime.fromObject({
          month: 12,
          day: 5,
          year: 2020,
          hour: 12,
          minute: 15,
        }),
      };

      const { getByTestId } = renderWithTheme(<RangeDateTimePicker {...newProps} />);
      const { queryByText } = within(getByTestId('startTime-input-group'));

      expect(queryByText('Enter a valid time')).not.toBeInTheDocument();

      fireEvent.change(screen.getByTestId('startTime-input-mm'), {
        target: { value: 15 },
      });

      expect(queryByText('Enter a valid time')).toBeInTheDocument();
    });

    it('should display start time error, if start > end', () => {
      const newProps = {
        ...props,
        end: DateTime.fromObject({
          month: 12,
          day: 5,
          year: 2020,
          hour: 12,
          minute: 15,
        }),
      };

      const { getByTestId } = renderWithTheme(<RangeDateTimePicker {...newProps} />);
      const { queryByText } = within(getByTestId('startTime-input-group'));

      expect(queryByText('Enter a valid time')).not.toBeInTheDocument();

      fireEvent.change(screen.getByTestId('startTime-input-mm'), {
        target: { value: 20 },
      });

      expect(queryByText('Enter a valid time')).toBeInTheDocument();
    });

    it('should not display start time error, if start < end', () => {
      const { getByTestId } = renderWithTheme(<RangeDateTimePicker {...props} />);
      const { queryByText } = within(getByTestId('startTime-input-group'));

      fireEvent.change(screen.getByTestId('startTime-input-mm'), {
        target: { value: 40 },
      });

      expect(queryByText('Enter a valid time')).toBeInTheDocument();

      fireEvent.change(screen.getByTestId('startTime-input-mm'), {
        target: { value: 10 },
      });

      expect(queryByText('Enter a valid time')).not.toBeInTheDocument();
    });
  });

  describe('#handleEndChange', () => {
    const props = {
      start: DateTime.fromObject({
        month: 12,
        day: 5,
        year: 2020,
        hour: 12,
        minute: 20,
      }),
      end: DateTime.fromObject({
        month: 12,
        day: 5,
        year: 2020,
        hour: 12,
        minute: 15,
      }),
    };

    it('should remove start time error, if it existed', () => {
      const { getByTestId } = renderWithTheme(<RangeDateTimePicker {...props} />);
      const { queryByText } = within(getByTestId('startTime-input-group'));

      fireEvent.change(screen.getByTestId('startTime-input-mm'), {
        target: { value: 15 },
      });

      expect(queryByText('Enter a valid time')).toBeInTheDocument();

      fireEvent.change(screen.getByTestId('endTime-input-mm'), {
        target: { value: 10 },
      });

      expect(queryByText('Enter a valid time')).not.toBeInTheDocument();
    });

    it('should display end time error, if start = end', () => {
      const newProps = {
        ...props,
        end: DateTime.fromObject({
          month: 12,
          day: 5,
          year: 2020,
          hour: 12,
          minute: 25,
        }),
      };

      const { getByTestId } = renderWithTheme(<RangeDateTimePicker {...newProps} />);
      const { queryByText } = within(getByTestId('endTime-input-group'));

      expect(queryByText('Enter a valid time')).not.toBeInTheDocument();

      fireEvent.change(screen.getByTestId('endTime-input-mm'), {
        target: { value: 20 },
      });

      expect(queryByText('Enter a valid time')).toBeInTheDocument();
    });

    it('should display end time error, if start > end', () => {
      const newProps = {
        ...props,
        end: DateTime.fromObject({
          month: 12,
          day: 5,
          year: 2020,
          hour: 12,
          minute: 25,
        }),
      };

      const { getByTestId } = renderWithTheme(<RangeDateTimePicker {...newProps} />);
      const { queryByText } = within(getByTestId('endTime-input-group'));

      expect(queryByText('Enter a valid time')).not.toBeInTheDocument();

      fireEvent.change(screen.getByTestId('endTime-input-mm'), {
        target: { value: 10 },
      });

      expect(queryByText('Enter a valid time')).toBeInTheDocument();
    });

    it('should remove end time error, if start < end', () => {
      const { getByTestId } = renderWithTheme(<RangeDateTimePicker {...props} />);
      const { queryByText } = within(getByTestId('endTime-input-group'));

      expect(queryByText('Enter a valid time')).toBeInTheDocument();

      fireEvent.change(screen.getByTestId('startTime-input-mm'), {
        target: { value: 30 },
      });

      expect(queryByText('Enter a valid time')).not.toBeInTheDocument();
    });
  });
});
