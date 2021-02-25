import React from 'react';

import { renderWithProviders, screen } from 'utils/testUtils';

import Layout from './Layout';

describe('#Layout component', () => {
  const props = {
    renderHeader: jest.fn(),
    renderLeft: jest.fn(),
    renderCenter: jest.fn(),
    renderRight: jest.fn(),
    renderFooter: jest.fn(),
  };
  const renderLayout = () => renderWithProviders(<Layout {...props} />);

  it('should render expected content', () => {
    renderLayout();

    expect(screen.getByTestId('header-layout')).toBeInTheDocument();
    expect(screen.getByTestId('left-content')).toBeInTheDocument();
    expect(screen.getByTestId('center-content')).toBeInTheDocument();
    expect(screen.getByTestId('right-content')).toBeInTheDocument();
    expect(screen.getByTestId('footer-layout')).toBeInTheDocument();
  });

  it('should call passed props', () => {
    renderLayout();

    expect(props.renderHeader).toHaveBeenCalled();
    expect(props.renderLeft).toHaveBeenCalled();
    expect(props.renderCenter).toHaveBeenCalled();
    expect(props.renderRight).toHaveBeenCalled();
    expect(props.renderFooter).toHaveBeenCalled();
  });
});
