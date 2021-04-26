import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { cleanup, act, renderWithTheme } from 'utils/testUtils';
import { Loading } from 'store/types';

import EventSidebar, { TEST_ID, FILTERS } from './EventSidebar';

describe('<EventSidebar />', () => {
  const mock = new MockAdapter(axios);

  beforeAll(() => {
    mock.reset();
  });

  afterEach(cleanup);

  describe('#render', () => {
    const props = {
      events: [],
      loading: Loading.IDLE,
      loadEvents: jest.fn(),
    };

    it('should not render wrapper, if loading is not started', () => {
      const { queryByTestId } = renderWithTheme(<EventSidebar {...props} />);

      expect(queryByTestId(TEST_ID)).not.toBeInTheDocument();
    });

    it('should render Loading state is loading is pending', () => {
      const newProps = {
        ...props,
        loading: Loading.PENDING,
      };
      const { queryByTestId, getByText } = renderWithTheme(
        <EventSidebar {...newProps} />,
      );

      expect(queryByTestId(TEST_ID)).toBeInTheDocument();
      expect(getByText('Loading events...')).toBeInTheDocument();
    });

    it('should render failed state, if loading is failed', () => {
      const newProps = {
        ...props,
        loading: Loading.FAILED,
      };

      const { queryByTestId, getByText } = renderWithTheme(
        <EventSidebar {...newProps} />,
      );

      expect(queryByTestId(TEST_ID)).toBeInTheDocument();
      expect(getByText('Here some error')).toBeInTheDocument();
    });

    it('should render empty container, if loading is succeeded and no events', () => {
      const newProps = {
        ...props,
        loading: Loading.SUCCEEDED,
      };

      const { queryByTestId, getByText } = renderWithTheme(
        <EventSidebar {...newProps} />,
      );

      expect(queryByTestId(TEST_ID)).toBeInTheDocument();
      expect(getByText('You have no events')).toBeInTheDocument();
    });

    // it('should render large tile, if 1 event in the list', () => {});
    //
    // it('should render 1 large and 1 small tiles, if 2 events in the list', () => {});
    //
    // it('should render 1 large and 2 small tiles, if 3 events in the list', () => {});
    //
    // it('should render 1 large, 2 small tiles and All events button, if more than 3 events in the list', () => {});
    //
    // it('should render On-Air, if event is happening now', () => {});
  });

  describe('#eseEffect', async () => {
    afterEach(() => {
      cleanup();
    });

    const props = {
      events: [],
      loading: Loading.IDLE,
      loadEvents: jest.fn(),
    };

    it('should call loadEvents, if empty events', async () => {
      await act(async () => {
        renderWithTheme(<EventSidebar {...props} />);
      });

      expect(props.loadEvents).toHaveBeenCalledTimes(1);
      expect(props.loadEvents).toHaveBeenCalledWith(FILTERS);
    });

    // it('should not call loadEvents, if not empty events', async () => {});
  });
});
