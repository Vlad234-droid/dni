import React from 'react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router';

import { renderWithProviders } from 'utils/testUtils';
import { buildPublicPath } from 'config/api';

import { TEST_ID as HEADER_TEST_ID } from 'features/Header';
import { TEST_ID as MENU_TEST_ID } from 'features/Menu';
import { TEST_ID as NETWORK_TEST_ID } from 'features/Network';

import { TEST_ID as BASE_PAGE_TEST_ID } from '../BasePage';
import { TEST_ID as PAGE_HEADER_TEST_ID } from '../PageHeader';
import { TEST_ID as PAGE_WRAPPER_TEST_ID } from '../PageWrapper';
import NetworkPage, { TEST_ID } from './Network';

describe('<Network />', () => {
  const history = createMemoryHistory();
  const path = `/route/:id`;
  const match: match<{ id: string }> = {
    isExact: false,
    path,
    url: path.replace(':id', '1'),
    params: { id: '1' },
  };
  const location = createLocation(match.url);

  const render = () =>
    renderWithProviders(
      <Router history={history}>
        <Route path={ buildPublicPath('/') }>
          <NetworkPage history={history} location={location} match={match} />
        </Route>
      </Router>,
    );

  it('should render page wrapper', () => {
    const { getByTestId } = render();

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });

  it('should render base page', () => {
    const { getByTestId } = render();

    expect(getByTestId(BASE_PAGE_TEST_ID)).toBeInTheDocument();
  });

  it('should render main content blocks', () => {
    const { getByTestId } = render();

    expect(getByTestId(PAGE_HEADER_TEST_ID)).toBeInTheDocument();
    expect(getByTestId(PAGE_WRAPPER_TEST_ID)).toBeInTheDocument();
    expect(getByTestId(HEADER_TEST_ID)).toBeInTheDocument();
    expect(getByTestId(MENU_TEST_ID)).toBeInTheDocument();
  });

  // TODO: network is not reachable?
  // it('should render network component', () => {
  //   const { getByTestId } = render();
  //
  //   expect(getByTestId(NETWORK_TEST_ID)).toBeInTheDocument();
  // });

  it('should render image container', () => {
    const { getByTestId } = render();

    expect(getByTestId('image-container')).toBeInTheDocument();
  });
});
