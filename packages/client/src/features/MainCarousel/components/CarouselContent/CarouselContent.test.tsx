import React from 'react';
import isString from 'lodash.isstring';

import { renderWithTheme } from 'utils/testUtils';

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

    it('should render "Read more" button, if isOpen is false', () => {
      const { getByText, getByTestId } = renderWithTheme(<DummySlideItem />);

      expect(getByText('Read more')).toBeInTheDocument();
    });

    it('should render "Read less" button, if isOpen is true', () => {
      const newTestDate = {
        ...testData,
        isOpen: true,
      };

      const { getByText } = renderWithTheme(
        <CarouselContent {...newTestDate} />,
      );

      expect(getByText('Read less')).toBeInTheDocument();
    });
  });
});
