import React from 'react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { renderWithProviders } from 'utils/testUtils';

import NewsFeed from './NewsFeed';

describe('#News Feed page', () => {
  const history = createMemoryHistory();
  it('should render center content', () => {
    const { getByTestId } = renderWithProviders(
      <Router history={history}>
        <Route>
          <NewsFeed />
        </Route>
      </Router>,
    );

    expect(getByTestId('container_feeds')).toBeInTheDocument();
  });
});
