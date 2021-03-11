import React from 'react';

import { renderWithProviders } from 'utils/testUtils';

import AboutContent from './Content';

describe('#About page', () => {
  it('should render center content', () => {
    const { getByTestId } = renderWithProviders(<AboutContent />);

    expect(getByTestId('about')).toBeInTheDocument();
    expect(getByTestId('info-panel')).toBeInTheDocument();
    expect(getByTestId('networks-preview')).toBeInTheDocument();
    expect(getByTestId('main-carousel')).toBeInTheDocument();
  });
});
