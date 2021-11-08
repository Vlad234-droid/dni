import React from 'react';

import { renderWithTheme } from 'utils/testUtils';

import Intro from './Intro';

describe('<Intro /> render', () => {
  describe('#render', () => {
    it('should render all components', () => {
      const { getByTestId } = renderWithTheme(<Intro />);

      expect(getByTestId('intro')).toBeInTheDocument();
      expect(getByTestId('intro-heading')).toBeInTheDocument();
      expect(getByTestId('intro-description')).toBeInTheDocument();
      expect(getByTestId('intro-video')).toBeInTheDocument();
    });
  });
});
