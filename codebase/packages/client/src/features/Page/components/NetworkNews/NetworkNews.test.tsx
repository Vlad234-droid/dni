import React from 'react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { render } from 'utils/testUtils';

import NetworkNews from './NetworkNews';

describe('<NetworkNews /> page', () => {
  it('should render left and right content', () => {
    const { getByTestId } = render(<NetworkNews />);

    expect(getByTestId('container-feeds')).toBeInTheDocument();
    expect(getByTestId('container-sidebar')).toBeInTheDocument();
  });

  it('should render EventSidebar component and PostList, if no id in params', () => {
    const { getByTestId } = render(<NetworkNews />);

    expect(getByTestId('events-sidebar')).toBeInTheDocument();
    expect(getByTestId('posts-list')).toBeInTheDocument();
  });

  // TODO:
  it('should render EventSidebar component and PostSingle, if id in params', () => {
    const { getByTestId } = render(
      <Route path={'/network-news/12345'}>
        <NetworkNews />
      </Route>,
      {route: 'network-news/12345'});

    // expect(history.location.pathname).toEqual('network-news/12345');
  });
});