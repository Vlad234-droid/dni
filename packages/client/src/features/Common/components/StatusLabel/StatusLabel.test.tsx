import React from 'react';

import { renderWithTheme } from 'utils/testUtils';

import StatusLabel, { StatusType } from './StatusLabel';

describe('<StatusLabel />', () => {
  describe('#render', () => {
    it('should render children', () => {
      const props = {
        children: <div>mocked_children</div>,
        type: StatusType.SUCCESS,
      };

      const { getByText } = renderWithTheme(<StatusLabel {...props} />);
      expect(getByText('mocked_children')).toBeInTheDocument();
    });

    it('should green background, if type is SUCCESS', () => {
      const props = {
        children: <div>mocked_children</div>,
        type: StatusType.SUCCESS,
      };

      const { getByTestId } = renderWithTheme(<StatusLabel {...props} />);
      const style = window.getComputedStyle(getByTestId('status-label'));

      expect(style.background).toBe('rgb(0, 136, 0)');
    });

    it('should red background, if type is ERROR', () => {
      const props = {
        children: <div>mocked_children</div>,
        type: StatusType.ERROR,
      };

      const { getByTestId } = renderWithTheme(<StatusLabel {...props} />);
      const style = window.getComputedStyle(getByTestId('status-label'));

      expect(style.background).toBe('rgb(204, 51, 51)');
    });

    it('should yellow background, if type is WARNING', () => {
      const props = {
        children: <div>mocked_children</div>,
        type: StatusType.WARNING,
      };

      const { getByTestId } = renderWithTheme(<StatusLabel {...props} />);
      const style = window.getComputedStyle(getByTestId('status-label'));

      expect(style.background).toBe('rgb(255, 153, 0)');
    });
  });
});
