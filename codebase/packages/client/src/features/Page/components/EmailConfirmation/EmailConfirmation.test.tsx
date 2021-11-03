import React from 'react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router';

import { renderWithProviders } from 'utils/testUtils';
import EmailConfirmationPage, { TEST_ID } from './EmailConfirmation';

describe('<EmailConfirmationPage />', () => {
  const history = createMemoryHistory();
  const path = `/route/:token`;
  const match: match<{ token: string }> = {
    isExact: false,
    path,
    url: path.replace(':token', 'test'),
    params: { token: 'token' },
  };
  const location = createLocation(match.url);

  const render = () =>
    renderWithProviders(
      <Router history={history}>
        <Route path={'/'}>
          <EmailConfirmationPage history={history} location={location} match={match} />
        </Route>
      </Router>,
    );

  it('should render page wrapper', () => {
    const { getByTestId } = render();

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });
});
