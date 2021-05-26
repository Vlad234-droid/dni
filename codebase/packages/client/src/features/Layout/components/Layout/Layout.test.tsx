import React from 'react';

import { renderWithProviders, screen } from 'utils/testUtils';

import Layout from './Layout';

describe('#Layout component', () => {
  const props = {
    renderHeader: jest.fn(),
    renderLeft: jest.fn(),
    renderMain: jest.fn(),
  };
  const renderLayout = () => renderWithProviders(<Layout {...props} />);

  it('should render expected content', () => {
    renderLayout();

    expect(screen.getByTestId('header-container')).toBeInTheDocument();
    expect(screen.getByTestId('left-content')).toBeInTheDocument();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
  });

  it('should call passed props', () => {
    renderLayout();

    expect(props.renderHeader).toHaveBeenCalled();
    expect(props.renderLeft).toHaveBeenCalled();
  });
});
