import React from 'react';

import { render, screen } from 'utils/testUtils';

import { menuItemsMobile } from '../../config/items';
import MenuMobile, { TEST_ID } from './MenuMobile';

describe('<MenuMobile />', () => {
  describe('#render', () => {
    it('should render wrapper', () => {
      render(<MenuMobile />);
      const result = screen.getByTestId(TEST_ID);

      expect(result).toBeInTheDocument();
    });

    it('should render home link', () => {
      render(<MenuMobile />);
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should contain available visible items', () => {
      render(<MenuMobile />);

      Object.values(menuItemsMobile).forEach((name) => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });
  });
});
