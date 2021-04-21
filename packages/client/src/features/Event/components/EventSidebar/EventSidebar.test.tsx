import React from 'react';

import { render } from 'utils/testUtils';

import EventSidebar, { TEST_ID } from './EventSidebar';

// TODO: check getEvents action was dispatched with filters
// TODO: check one large and two small tiles rendered
// TODO: check on Air rendered
describe('<EventSidebar />', () => {
  describe('#render', () => {
    const initialState = {
      events: {
        entities: {},
        loading: 'idle',
        ids: [],
        error: null,
        meta: {},
      },
    };

    it('should not render wrapper, if loading is not started', () => {
      const { queryByTestId } = render(<EventSidebar />, {
        initialState,
      });

      expect(queryByTestId(TEST_ID)).not.toBeInTheDocument();
    });

    it('should render wrapper and Loading state is loading is pending', () => {
      const { getByText, queryByTestId } = render(<EventSidebar />, {
        initialState: {
          ...initialState,
          events: {
            ...initialState.events,
            loading: 'pending',
          },
        },
      });

      expect(queryByTestId(TEST_ID)).toBeInTheDocument();
      expect(getByText('Loading events...')).toBeInTheDocument();
    });

    it('should render empty container, if loading is succeeded and no events', () => {
      const { getByText, queryByTestId } = render(<EventSidebar />, {
        initialState: {
          ...initialState,
          events: {
            ...initialState.events,
            loading: 'succeeded',
          },
        },
      });

      expect(queryByTestId(TEST_ID)).not.toBeInTheDocument();
      expect(getByText('You have no events')).toBeInTheDocument();
    });
  });
});
