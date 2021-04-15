import React from 'react';
import userEvent from '@testing-library/user-event';

import { renderWithTheme } from 'utils/testUtils';

import Intro from './Intro';

type IconProps = {
  graphic: string;
};

jest.mock('@beans/icon', () => {
  return function DummyIcon({ graphic }: IconProps) {
    return <div data-testid={`icon-${graphic}`} />;
  };
});

describe('<Intro />', () => {
  describe('#render', () => {
    it('should render initially "Read more" button and icon-expand', () => {
      const { getByTestId, getByText } = renderWithTheme(<Intro />);

      expect(getByTestId('icon-expand')).toBeInTheDocument();
      expect(getByText('Read more')).toBeInTheDocument();
    });

    it('should render "Read less button" and icon-contract when button is clicked', () => {
      const { getByTestId, getByRole, getByText } = renderWithTheme(<Intro />);
      userEvent.click(getByRole('button'));

      expect(getByTestId('icon-contract')).toBeInTheDocument();
      expect(getByText('Read less')).toBeInTheDocument();
    });
  });
});
