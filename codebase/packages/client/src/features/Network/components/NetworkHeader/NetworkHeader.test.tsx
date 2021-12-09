import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { InterfaceContext } from 'context/InterfaceContext';
import { cleanup, render, fireEvent } from 'utils/testUtils';

import NetworkHeader from './NetworkHeader';

describe('<NetworkHeader />', () => {
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    mock.reset();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    cleanup();
  });

  describe('#render', () => {
    const props = {
      id: 123,
      title: 'mocked-title',
      email: 'mocked-email',
      onLeave: jest.fn(),
      onJoin: jest.fn(),
      events: [],
      isJoined: false,
      networks: [1, 2, 3],
    };

    const interfaceContextValueMock = {
      viewport: 320,
      isMobile: false,
      isLargeMobile: false,
      isTablet: false,
      isLargeTablet: false,
      isDesktop: false,
      lt: jest.fn(),
      lte: jest.fn(),
      gt: jest.fn(),
      gte: jest.fn(),
    };

    it('should return wrapper', () => {
      const { getByTestId } = render(<NetworkHeader {...props} />);

      expect(getByTestId('network-header')).toBeInTheDocument();
    });

    it('should render title and Share story button and copy link', () => {
      const { getByText, getAllByText, getByTestId } = render(<NetworkHeader {...props} />);

      expect(getAllByText('mocked-title')).toHaveLength(2);
      expect(getByText('Share story')).toBeInTheDocument();
      expect(getByTestId('copy-icon')).toBeInTheDocument();
    });

    it('should not render email, if !isMobile and !isLargeMobile', () => {
      const { queryByText } = render(
        <InterfaceContext.Provider
          value={interfaceContextValueMock}
        >
          <NetworkHeader {...props} />
        </InterfaceContext.Provider>);
      expect(queryByText('mocked-email')).not.toBeInTheDocument();
    });

    it('should render email, if isMobile', () => {
      const { queryByText } = render(
        <InterfaceContext.Provider
          value={{
            ...interfaceContextValueMock,
            isMobile: true,
          }}
        >
          <NetworkHeader {...props} />
        </InterfaceContext.Provider>);

      expect(queryByText('mocked-email')).toBeInTheDocument();
    });

    it('should not render email, if isLargeMobile', () => {
      const { queryByText } = render(
        <InterfaceContext.Provider
          value={{
            ...interfaceContextValueMock,
            isLargeMobile: true,
          }}
        >
          <NetworkHeader {...props} />
        </InterfaceContext.Provider>);

      expect(queryByText('mocked-email')).toBeInTheDocument();
    });

    it('should render Join button, if !isJoined', () => {
      const { getByText } = render(<NetworkHeader {...props} />);

      expect(getByText('Join')).toBeInTheDocument();
    });

    it('should not render Join button, if isJoined', () => {
      const newProps = {
        ...props,
        networks: [1, 2, 3, 123],
      }
      const { queryByText } = render(<NetworkHeader {...newProps} />);

      expect(queryByText('Join')).not.toBeInTheDocument();
    });

    it('should render share story button', () => {
      const { queryByTestId } = render(<NetworkHeader {...props} />);

      expect(queryByTestId('share-story-button')).toBeInTheDocument();
    });
  });
});
