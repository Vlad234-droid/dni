import React from 'react';
import { buildEventCRUD, buildOrganizationCRUD } from '@dni/mock-server/src/crud';

import { cleanup, render } from 'utils/testUtils';
import { InterfaceContext } from 'context/InterfaceContext';

import NetworkPartners from './NetworkPartners';
import NetworkAction from '../NetworkAction';

jest.mock('../NetworkAction', () => ({
  __esModule: true, namedExport: jest.fn(), default: jest.fn(),
}));

describe('<NetworkPartners />', () => {
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

  describe('#render', () => {
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

    it('should render nothing, if !isMobile, !isLargeMobile, !email, !isJoined, !partners', () => {
      const { queryByText } = render(
        <InterfaceContext.Provider
          value={interfaceContextValueMock}
        >
          <NetworkPartners {...props} />
        </InterfaceContext.Provider>);

      expect(queryByText('Get in touch')).not.toBeInTheDocument();
      expect(queryByText('Leave')).not.toBeInTheDocument();
      expect(queryByText('Join')).not.toBeInTheDocument();
      expect(queryByText('Network Partnership')).not.toBeInTheDocument();
    });

    it('should render email if passed and !isMobile && !isLargeMobile', () => {
      const newProps = {
        ...props,
        email: 'mocked-email',
      };

      const { queryByText } = render(
        <InterfaceContext.Provider value={interfaceContextValueMock}>
          <NetworkPartners {...newProps} />
        </InterfaceContext.Provider>
      );

      expect(queryByText('Get in touch')).toBeInTheDocument();
      expect(queryByText('mocked-email')).toBeInTheDocument();
    });

    it('should render partners list and partners, if they are passed and !isMobile, !isLargeMobile', () => {
      const organizationCRUD = buildOrganizationCRUD(COLLECTION_SIZE);
      const partners = organizationCRUD.findAll();

      const newProps = {
        ...props,
        partners,
      };

      const altText = partners[0].image?.alternativeText as string;

      const { queryByText, getByAltText, queryByTestId } = render(
        <InterfaceContext.Provider value={interfaceContextValueMock}>
          <NetworkPartners {...newProps} />
        </InterfaceContext.Provider>
      );

      expect(queryByText('Network Partnership')).toBeInTheDocument();
      expect(queryByTestId('network-partners')).toBeInTheDocument();
      expect(queryByTestId('partners-carousel')).not.toBeInTheDocument();
      expect(getByAltText(altText)).toBeInTheDocument();
    });

    it('should not render Leave button, if !isJoined', () => {
      // @ts-ignore
      NetworkAction.mockImplementation(() => <div>Leave</div>);

      const { queryByText } = render(<NetworkPartners {...props} />);

      expect(queryByText('Join')).not.toBeInTheDocument();
      expect(queryByText('Leave')).not.toBeInTheDocument();
    });


    it('should render Leave button, if isJoined', () => {
      // @ts-ignore
      NetworkAction.mockImplementation(() => <div>Leave</div>);

      const newProps = {
        ...props,
        networksIds: [1, 2, 3, 123],
      };
      const { queryByText } = render(<NetworkPartners {...newProps} />);

      expect(queryByText('Join')).not.toBeInTheDocument();
      expect(queryByText('Leave')).toBeInTheDocument();
    });

    it('should render partners carousel and partners, if isLargeMobile and they are passed', () => {
      // @ts-ignore
      NetworkAction.mockImplementation(() => <div>Leave</div>);

      const organizationCRUD = buildOrganizationCRUD(COLLECTION_SIZE);
      const partners = organizationCRUD.findAll();

      const newProps = {
        ...props,
        partners,
      };

      const altText = partners[0].image?.alternativeText as string;

      const { queryByText, getByAltText, queryByTestId } = render(
        <InterfaceContext.Provider value={{...interfaceContextValueMock, isLargeMobile: true, isMobile: true }}>
          <NetworkPartners {...newProps} />
        </InterfaceContext.Provider>
      );

      expect(queryByText('Network Partnership')).toBeInTheDocument();
      expect(queryByTestId('network-partners')).not.toBeInTheDocument();
      expect(queryByTestId('carousel')).toBeInTheDocument();
      expect(getByAltText(altText)).toBeInTheDocument();
    });
  });
});
