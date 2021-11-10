import React from 'react';

import { cleanup, fireEvent, render } from 'utils/testUtils';

import AccessibilityButton from './AccessibilityButton';
import { Mode } from '../../types';

describe('<AccessibilityButton />', () => {
  const props = {
    mode: Mode.DARK,
  };

  describe('#render', () => {
    it('should render wrapper and Accessibility button', () => {
      const { getByTestId, getByText } = render(<AccessibilityButton {...props} />);

      expect(getByTestId('accessibility')).toBeInTheDocument();
      expect(getByText('Accessibility')).toBeInTheDocument();
      expect(getByTestId('accessibility-content')).toHaveStyle('transform: translate3d(0,-29px,0) scaleY(0)');
      expect(getByText('Information')).toHaveStyle('visibility: hidden');
      expect(getByText('Toolbar (Reciteme)')).toHaveStyle('visibility: hidden');
    });
  });

  describe('#handleButtonClick', () => {
    it('should show/hide content on button click', () => {
      const { getByTestId, getByText } = render(<AccessibilityButton {...props} />);
      fireEvent.click(getByTestId('accessibility-open-button'));

      expect(getByTestId('accessibility-content')).toHaveStyle('transform: translate3d(0,0,0) scaleY(1)');
      expect(getByText('Information')).toHaveStyle('visibility: visible');
      expect(getByText('Toolbar (Reciteme)')).toHaveStyle('visibility: visible');

      fireEvent.click(getByTestId('accessibility-open-button'));

      expect(getByTestId('accessibility-content')).toHaveStyle('transform: translate3d(0,-29px,0) scaleY(0)');
      expect(getByText('Information')).toHaveStyle('visibility: hidden');
      expect(getByText('Toolbar (Reciteme)')).toHaveStyle('visibility: hidden');
    });
  });

  describe('handleLinkClick', () => {
    it('should hide content on link click', () => {
      const { getByTestId, getByText } = render(<AccessibilityButton {...props} />);
      fireEvent.click(getByTestId('accessibility-open-button'));
      fireEvent.click(getByText('Information'));

      expect(getByTestId('accessibility-content')).toHaveStyle('transform: translate3d(0,-29px,0) scaleY(0)');
      expect(getByText('Information')).toHaveStyle('visibility: hidden');
      expect(getByText('Toolbar (Reciteme)')).toHaveStyle('visibility: hidden');
    });
  });
});
