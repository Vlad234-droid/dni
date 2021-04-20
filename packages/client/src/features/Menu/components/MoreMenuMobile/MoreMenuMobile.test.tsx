import React from 'react';

import { renderWithRouter } from 'utils/testUtils';

import { menuItemsMobile } from '../../config/items';
import { MENU_TEST_ID_PREFIX } from '../MenuItem';
import MoreMenuMobile from './MoreMenuMobile';

describe('<MoreMenuMobile />', () => {
  describe('#render', () => {
    it('should render a wrapper', () => {
      const { getByTestId } = renderWithRouter(<MoreMenuMobile />);

      expect(getByTestId('more-menu-mobile')).toBeInTheDocument();
    });

    it('should render links', () => {
      const { getByText } = renderWithRouter(<MoreMenuMobile />);

      expect(getByText('Colleague Help')).toBeInTheDocument();
      expect(getByText('Terms & Conditions')).toBeInTheDocument();
    });

    it('should render a list of hidden items', () => {
      const { getByTestId } = renderWithRouter(<MoreMenuMobile />);

      Object.values(menuItemsMobile.hidden).forEach((name) => {
        expect(
          getByTestId(`${MENU_TEST_ID_PREFIX}${name?.toLowerCase()}`),
        ).toBeInTheDocument();
      });
    });
  });
});
