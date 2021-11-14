import React from 'react';
import isString from 'lodash.isstring';

import { renderWithTheme, render } from 'utils/testUtils';

import CarouselContent from '../CarouselContent';

describe('<CarouselContent />', () => {
  const testData = {
    title: 'test',
    description: 'description',
    image: { src: 'test' },
    isOpen: false,
    onClick: jest.fn(),
  };

  const DummySlideItem = () => (
    <div data-testid='dummy-slide'>
      <CarouselContent {...testData} />
    </div>
  );

  describe('#render', () => {
    it('should render slide', () => {
      const { getByTestId } = renderWithTheme(<DummySlideItem />);

      const slideItem = getByTestId('dummy-slide');

      expect(slideItem).toBeInTheDocument();

      Object.values(testData)
        .filter(isString)
        .forEach((data) => expect(slideItem).toHaveTextContent(data));
    });

    it('should render props provided', () => {
      const props = {
        title: 'mocked-title',
        description: 'mocked-description',
        image: {
          src: 'mocked-src',
        }
      };

      render(<CarouselContent {...props} />);
    });
  });
});
