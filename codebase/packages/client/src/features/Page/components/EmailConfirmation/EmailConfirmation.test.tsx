import React from 'react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router';

import { render } from 'utils/testUtils';
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

  it('should render page wrapper', () => {
    const { getByTestId } = render(
      <Router history={history}>
        <Route path={'/'}>
          <EmailConfirmationPage history={history} location={location} match={match} />
        </Route>
      </Router>,
    );

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });
});
