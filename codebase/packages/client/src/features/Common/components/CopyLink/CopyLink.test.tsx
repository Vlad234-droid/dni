import React from 'react';
import copy from 'copy-to-clipboard';

import {act, fireEvent, render, screen} from 'utils/testUtils';

import CopyLink from './CopyLink';

jest.mock('copy-to-clipboard', () => jest.fn());
jest.mock('utils/path', () => ({
  getPath: (to: string) => to,
}));

describe('<CopyLink />', () => {
  const props = {
    to: '/test',
    showNotification: jest.fn(),
    hideNotification: jest.fn(),
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('#render', () => {
    it('should render correctly', () => {
      const { getByTestId } = render(<CopyLink {...props} />);

      expect(getByTestId('copy-button')).toBeInTheDocument();
      expect(getByTestId('copy-icon')).toBeInTheDocument();
    });
  });

  describe('#handleClick', () => {
    it('should call hideNotification and showNotification with setTimeout', async () => {
      await act(async () => {
        render(<CopyLink {...props} />);
      });

      fireEvent.click(screen.getByTestId('copy-button'));

      expect(props.showNotification).not.toBeCalled();
      expect(props.hideNotification).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(100);

      expect(setTimeout).toHaveBeenLastCalledWith(props.showNotification, 100);
      expect(props.showNotification).toHaveBeenCalledTimes(1);
    });

    it('should call copy with provided pathname', () => {
      const { host, protocol } = window.location;
      render(<CopyLink {...props} />);

      fireEvent.click(screen.getByTestId('copy-button'));

      expect(copy).toHaveBeenCalledTimes(1);
      expect(copy).toHaveBeenCalledWith(`${protocol}//${host}/test`);
    });

    it('should call copy with default pathname, if it is not in props', () => {
      const { host, protocol } = window.location;

      const props = {
        showNotification: jest.fn(),
        hideNotification: jest.fn(),
      };

      render(<CopyLink {...props} />);

      fireEvent.click(screen.getByTestId('copy-button'));
      expect(copy).toHaveBeenCalledTimes(1);
      expect(copy).toHaveBeenCalledWith(`${protocol}//${host}/`);
    });
  });
});
