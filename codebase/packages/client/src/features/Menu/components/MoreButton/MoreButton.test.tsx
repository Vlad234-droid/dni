import React from 'react';

import { renderWithRouter } from 'utils/testUtils';
import { Page } from 'features/Page';

import MoreButton from './MoreButton';

describe('<MoreButton />', () => {
  describe('#render', () => {
    const props = {
      onClick: jest.fn(),
      isOpened: false,
      pathname: Page.NETWORKS,
    };

    it('should render wrapper', () => {
      const { getByTestId } = renderWithRouter(<MoreButton {...props} />);

      expect(getByTestId('menu-more-button')).toBeInTheDocument();
    });

    it('should render More text, if no more menu items selected', () => {
      const { getByText } = renderWithRouter(<MoreButton {...props} />);

      expect(getByText('More')).toBeInTheDocument();
    });

    it('should render About, if about page is active', () => {
      const props = {
        onClick: jest.fn(),
        isOpened: false,
        pathname: '/',
      };
      const { getByText } = renderWithRouter(<MoreButton {...props} />);

      expect(getByText('About')).toBeInTheDocument();
    });

    it('should render Reports, if reports page is active', () => {
      const props = {
        onClick: jest.fn(),
        isOpened: false,
        pathname: Page.REPORTS,
      };
      const { getByText } = renderWithRouter(<MoreButton {...props} />);

      expect(getByText('Reports')).toBeInTheDocument();
    });

    it('should not render button as active, if more menu is closed and hidden item is not active', () => {
      const props = {
        onClick: jest.fn(),
        isOpened: false,
        pathname: Page.NETWORKS,
      };
      const { getByTestId } = renderWithRouter(<MoreButton {...props} />);
      const style = window.getComputedStyle(getByTestId('menu-more-button'));

      expect(style.background).toBe('rgb(255, 255, 255)');
      expect(style.color).toBe('rgb(0, 83, 159)');
    });

    it('should render button as active, if more menu is opened', () => {
      const props = {
        onClick: jest.fn(),
        isOpened: true,
        pathname: Page.NETWORKS,
      };
      const { getByTestId } = renderWithRouter(<MoreButton {...props} />);
      const style = window.getComputedStyle(getByTestId('menu-more-button'));

      expect(style.background).toBe('rgb(0, 83, 159)');
      expect(style.color).toBe('rgb(255, 255, 255)');
    });

    it('should render button as active, if more menu is closed but hidden item is active', () => {
      const props = {
        onClick: jest.fn(),
        isOpened: false,
        pathname: '/',
      };

      const { getByTestId } = renderWithRouter(<MoreButton {...props} />);
      const style = window.getComputedStyle(getByTestId('menu-more-button'));

      expect(style.background).toBe('rgb(0, 83, 159)');
      expect(style.color).toBe('rgb(255, 255, 255)');
    });

    it('should render button as active, if more menu is opened and hidden item is active', () => {
      const props = {
        onClick: jest.fn(),
        isOpened: true,
        pathname: '/',
      };

      const { getByTestId } = renderWithRouter(<MoreButton {...props} />);
      const style = window.getComputedStyle(getByTestId('menu-more-button'));

      expect(style.background).toBe('rgb(0, 83, 159)');
      expect(style.color).toBe('rgb(255, 255, 255)');
    });
  });
});
