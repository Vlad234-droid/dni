import React from 'react';

import { renderWithProviders, render } from 'utils/testUtils';

import EventSidebar, { TEST_ID } from './EventSidebar';

// TODO: check getEvents action was dispatched with filters
// TODO: check one large and two small tiles rendered
// TODO: check on Air rendered
// TODO: check isEmpty(events)
// TODO: check isLoading
describe('<EventSidebar />', () => {
  describe('#render', () => {
    it('should render wrapper', () => {
      const { getByTestId } = renderWithProviders(<EventSidebar />);

      expect(getByTestId(TEST_ID)).toBeInTheDocument();
    });

    it('should render All events link', () => {
      const { getByText } = render(<EventSidebar />, {
        initialState: {
          events: {
            entities: {},
            isLoading: false,
            ids: [],
            error: null,
            meta: {},
          },
        },
      });

      expect(getByText('All events')).toBeInTheDocument();
    });
  });
});
