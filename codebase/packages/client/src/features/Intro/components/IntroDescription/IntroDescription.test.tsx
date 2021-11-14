import React from 'react';

import { renderWithTheme } from 'utils/testUtils';
import { useMedia } from 'context/InterfaceContext';

import IntroDescription from './IntroDescription';

jest.mock('context/InterfaceContext');

describe('<IntroDescription />', () => {
  describe('#render', () => {
    it('should render opened content, if !isDesktop (even if !isOpen) and dont render buttons', () => {
      // @ts-ignore
      useMedia.mockReturnValue({
        isDesktop: false,
      });

      const props = {
        onClick: jest.fn(),
        isOpen: false,
      };

      const { getByTestId, queryByText } = renderWithTheme(<IntroDescription {...props} />);

      expect(getByTestId('intro-description-content')).toHaveStyle('overflow: visible');
      expect(queryByText('Read more')).not.toBeInTheDocument();
      expect(queryByText('Read less')).not.toBeInTheDocument();
    });

    it('should render collapsed content and "Read more" button, if isDesktop and !isOpen', () => {
      // @ts-ignore
      useMedia.mockReturnValue({
        isDesktop: true,
      });

      const props = {
        onClick: jest.fn(),
        isOpen: false,
      };

      const { getByTestId, getByText } = renderWithTheme(<IntroDescription {...props}/>);

      expect(getByTestId('intro-description-content')).toHaveStyle('overflow: hidden');
      expect(getByText('Read more')).toBeInTheDocument();
    });

    it('should render visible content and "Read less" button, if isDesktop and isOpen', () => {
      // @ts-ignore
      useMedia.mockReturnValue({
        isDesktop: true,
      });

      const props = {
        onClick: jest.fn(),
        isOpen: true,
      };

      const { getByTestId, getByText } = renderWithTheme(<IntroDescription {...props}/>);

      expect(getByTestId('intro-description-content')).toHaveStyle('overflow: visible');
      expect(getByText('Read less')).toBeInTheDocument();
    });
  });
});
