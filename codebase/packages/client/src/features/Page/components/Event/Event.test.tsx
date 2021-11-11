import React from 'react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router';

import { render } from 'utils/testUtils';

import { TEST_ID as BASE_PAGE_TEST_ID } from '../BasePage';
import { TEST_ID as PAGE_IMAGE_WRAPPER_TEST_ID } from '../PageImageWrapper';
import EventPage, { TEST_ID, IMAGE_WRAPPER_TEST_ID, BREADCRUMB_WRAPPER_TEST_ID } from './Event';

describe('<EventPage />', () => {
  const history = createMemoryHistory();
  const path = `/route/:id`;
  const match: match<{ id: string }> = {
    isExact: false,
    path,
    url: path.replace(':id', '1'),
    params: { id: '1' },
  };
  const location = createLocation(match.url);

  const renderWithProviders = () =>
    render(
      <Router history={history}>
        <Route path={'/'}>
          <EventPage history={history} location={location} match={match} />
        </Route>
      </Router>,
    );

  it('should render page wrapper', () => {
    const { getByTestId } = renderWithProviders();

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });

  it('should render base page', () => {
    const { getByTestId } = renderWithProviders();

    expect(getByTestId(BASE_PAGE_TEST_ID)).toBeInTheDocument();
  });

  it('should render main content blocks', () => {
    const { getByTestId } = renderWithProviders();

    expect(getByTestId(PAGE_IMAGE_WRAPPER_TEST_ID)).toBeInTheDocument();
    expect(getByTestId('breadcrumb-wrapper')).toBeInTheDocument();
  });

  it('should render event component', () => {
    const { getByTestId } = renderWithProviders();

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
  });

  it('should render image and breadcrumb containers', () => {
    const { getByTestId } = renderWithProviders();

    expect(getByTestId(IMAGE_WRAPPER_TEST_ID)).toBeInTheDocument();
    expect(getByTestId(BREADCRUMB_WRAPPER_TEST_ID)).toBeInTheDocument();
  });
});
