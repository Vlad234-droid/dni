import React from 'react';

import { renderWithProviders } from 'utils/testUtils';

import About from './About';

describe('#About page', () => {
  it('should render center content', () => {
    const { getByTestId } = renderWithProviders(<About />);

    expect(getByTestId('about')).toBeInTheDocument();
    expect(getByTestId('info-panel')).toBeInTheDocument();
    expect(getByTestId('networks-preview')).toBeInTheDocument();
    expect(getByTestId('carousel')).toBeInTheDocument();
  });
});
