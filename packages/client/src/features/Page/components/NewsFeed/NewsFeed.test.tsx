import React from 'react';

import { renderWithProviders } from 'utils/testUtils';

import NewsFeed from './NewsFeed';

describe('#News Feed page', () => {
  it('should render center content', () => {
    const { getByTestId } = renderWithProviders(<NewsFeed />);

    expect(getByTestId('feed')).toBeInTheDocument();
  });

  it('should render right content', () => {
    const { getByTestId } = renderWithProviders(<NewsFeed />);

    expect(getByTestId('events')).toBeInTheDocument();
  });
});
