import React from 'react';

import { cleanup, fireEvent, render } from 'utils/testUtils';

import AccessibilityButton from './AccessibilityButton';
import { Mode } from '../../types';

describe('<AccessibilityButton />', () => {
  describe('#render', () => {
    const props = {
      mode: Mode.DARK,
    };

    it('should render wrapper and Accessibility button', () => {
      const { getByTestId, getByText, queryByText } = render(<AccessibilityButton {...props} />);

      expect(getByTestId('accessibility')).toBeInTheDocument();
      expect(getByText('Accessibility')).toBeInTheDocument();
      expect(queryByText('Information')).not.toBeInTheDocument();
      expect(queryByText('Toolbar (Reciteme)')).not.toBeInTheDocument();
    });

    it('should render content on button click', () => {
      const { getByTestId, getByText } = render(<AccessibilityButton {...props} />);
      fireEvent.click(getByTestId('accessibility-open-button'));

      expect(getByText('Information')).toBeInTheDocument();
      expect(getByText('Toolbar (Reciteme)')).toBeInTheDocument();
    })
  });
});
