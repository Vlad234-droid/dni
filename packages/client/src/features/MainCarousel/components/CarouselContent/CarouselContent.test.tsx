import React from 'react';
import isString from 'lodash.isstring';

import { renderWithTheme } from 'utils/testUtils';

import CarouselContent from '../CarouselContent';

describe('#CarouselContent', () => {
  const testData = {
    title: 'test',
    description: 'description',
    subTitle: 'subTitle',
    subDescription: 'test',
    image: { src: 'test' },
  };

  const DummySlideItem = () => (
    <div data-testid='dummy-slide'>
      <CarouselContent {...testData} />
    </div>
  );

  it('should render slide', () => {
    const { getByTestId } = renderWithTheme(<DummySlideItem />);

    const slideItem = getByTestId('dummy-slide');

    expect(slideItem).toBeInTheDocument();

    Object.values(testData)
      .filter(isString)
      .forEach((data) => expect(slideItem).toHaveTextContent(data));
  });
});
