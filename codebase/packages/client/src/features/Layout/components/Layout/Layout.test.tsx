import React from 'react';

import { render, screen } from 'utils/testUtils';

import Layout from './Layout';

describe('#Layout component', () => {
  const props = {
    renderHeader: jest.fn(),
    renderTopHeader: jest.fn(),
    renderMainHeader: jest.fn(),
    renderLeft: jest.fn(),
    renderMain: jest.fn(),
    renderBreadcrumb: jest.fn(),
  };
  const renderLayout = () => render(<Layout {...props} />);

  it('should render expected content', () => {
    renderLayout();

    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByTestId('top-header-container')).toBeInTheDocument();
    expect(screen.getByTestId('main-header-container')).toBeInTheDocument();
    expect(screen.getByTestId('header-container')).toBeInTheDocument();
    expect(screen.getByTestId('left-content')).toBeInTheDocument();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
    expect(screen.getByTestId('breadcrumb-container')).toBeInTheDocument();
  });

  it('should call passed props', () => {
    renderLayout();

    expect(props.renderHeader).toHaveBeenCalled();
    expect(props.renderTopHeader).toHaveBeenCalled();
    expect(props.renderMainHeader).toHaveBeenCalled();
    expect(props.renderLeft).toHaveBeenCalled();
    expect(props.renderMain).toHaveBeenCalled();
  });
});
