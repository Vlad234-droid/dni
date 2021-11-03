import React from 'react';
import { buildEventCRUD, buildOrganizationCRUD } from '@dni/mock-server/src/crud';

import { cleanup, render } from 'utils/testUtils';

import NetworkPartners from './NetworkPartners';
import { useMedia } from 'context/InterfaceContext';

jest.mock('context/InterfaceContext');

describe('<NetworkPartners />', () => {
  describe('#render', () => {
    fit('should render nothing, if !isMobile, !isLargeMobile, !email, !isJoined, !partners', () => {
      const COLLECTION_SIZE = 1;
      const eventCRUD = buildEventCRUD(COLLECTION_SIZE);
      const events = eventCRUD.findAll();

      const props = {
        id: 123,
        events,
        onJoin: jest.fn(),
        onLeave: jest.fn(),
        networksIds: [1, 2, 3],
      };

      // @ts-ignore
      useMedia.mockReturnValue({
        isMobile: false,
        isLargeMobile: false,
      });

      const { queryByText } = render(<NetworkPartners {...props} />);

      expect(queryByText('Get in touch')).not.toBeInTheDocument();
      expect(queryByText('Leave')).not.toBeInTheDocument();
      expect(queryByText('Network Partnership')).not.toBeInTheDocument();
    });

    it('should render email, partners, if they passed, leave button, if id in networkIds and !isMobile && !isLargeMobile', () => {
      const COLLECTION_SIZE = 1;
      const eventCRUD = buildEventCRUD(COLLECTION_SIZE);
      const events = eventCRUD.findAll();
      const organizationCRUD = buildOrganizationCRUD(COLLECTION_SIZE);
      const partners = organizationCRUD.findAll();

      const props = {
        id: 123,
        events,
        onJoin: jest.fn(),
        onLeave: jest.fn(),
        networksIds: [1, 2, 3, 123],
        email: 'mocked-email',
        partners,
      };

      // @ts-ignore
      useMedia.mockReturnValue({
        isMobile: false,
        isLargeMobile: false,
      });

      const { queryByText } = render(<NetworkPartners {...props} />);

      expect(queryByText('Get in touch')).toBeInTheDocument();
      expect(queryByText('mocked-email')).toBeInTheDocument();
      expect(queryByText('Leave')).toBeInTheDocument();
      expect(queryByText('Network Partnership')).toBeInTheDocument();
    });
  });
});
