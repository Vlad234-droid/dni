import React from 'react';
import userEvent from '@testing-library/user-event';

import { renderWithTheme } from 'utils/testUtils';

import About from './About';

type IconProps = {
  graphic: string;
};

jest.mock('@beans/icon', () => {
  return function DummyIcon({ graphic }: IconProps) {
    return <div data-testid={`icon-${graphic}`} />;
  };
});

describe('<About />', () => {
  describe('#render', () => {
    it('should render initially icon-expand', () => {
      const { getByTestId } = renderWithTheme(<About />);

      expect(getByTestId('icon-expand')).toBeInTheDocument();
    });

    it('should render icon-contract when button is clicked', () => {
      const { getByTestId, getByRole } = renderWithTheme(<About />);
      userEvent.click(getByRole('button'));

      expect(getByTestId('icon-contract')).toBeInTheDocument();
    });
  });
});
