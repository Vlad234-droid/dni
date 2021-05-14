import React from 'react';
import copy from 'copy-to-clipboard';

import { fireEvent, renderWithProviders, screen } from 'utils/testUtils';

import CopyLink from './CopyLink';

jest.mock('copy-to-clipboard', () => jest.fn());

describe('<CopyLink />', () => {
  const props = {
    pathname: '/test',
    showNotification: jest.fn(),
  };

  describe('#render', () => {
    it('should render correctly', () => {
      const { getByTestId } = renderWithProviders(<CopyLink {...props} />);

      expect(getByTestId('copy-button')).toBeInTheDocument();
      expect(getByTestId('copy-icon')).toBeInTheDocument();
    });
  });

  describe('#handleClick', () => {
    it('should call copy and showNotification', () => {
      const host = window.location.host;
      renderWithProviders(<CopyLink {...props} />);

      fireEvent.click(screen.getByTestId('copy-button'));

      expect(copy).toHaveBeenCalledTimes(1);
      expect(copy).toHaveBeenCalledWith(`${host}/test`);
      expect(props.showNotification).toHaveBeenCalledTimes(1);
    });

    it('should call copy with default pathname, if it is not in props', () => {
      const props = {
        showNotification: jest.fn(),
      };
      const host = window.location.host;

      renderWithProviders(<CopyLink {...props} />);

      fireEvent.click(screen.getByTestId('copy-button'));
      expect(copy).toHaveBeenCalledTimes(1);
      expect(copy).toHaveBeenCalledWith(`${host}/`);
    });
  });
});
