import React from 'react';

import { renderWithRouter, screen } from 'utils/testUtils';

import MainMenu from './MainMenu';

jest.mock('context/InterfaceContext');

import { useMedia } from 'context/InterfaceContext';

describe('<MainMenu />', () => {
  describe('#render', () => {
    it('should render MenuDesktop and NetworkUpdates, if desktop', () => {
      useMedia.mockReturnValue({ isDesktop: true });

      renderWithRouter(<MainMenu />);

      expect(screen.getByTestId('menu-desktop')).toBeInTheDocument();
      expect(screen.getByTestId('network-updates')).toBeInTheDocument();
    });

    it('should render MenuMobile, if !desktop', () => {
      useMedia.mockReturnValue({ isDesktop: false });

      renderWithRouter(<MainMenu />);

      expect(screen.getByTestId('menu-mobile')).toBeInTheDocument();
    });
  });
});
