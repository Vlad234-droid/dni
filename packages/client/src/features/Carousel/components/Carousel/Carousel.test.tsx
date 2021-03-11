import React from 'react';

import { renderWithTheme } from 'utils/testUtils';

import Carousel from './Carousel';

describe('#Carousel', () => {
  const DummySlideItem = () => <div data-testid='dummy-slide' />;

  it('should render carousel with slide', () => {
    const { getByTestId, getAllByTestId } = renderWithTheme(
      <Carousel itemWidth='300px' id='test-carousel'>
        <DummySlideItem />
        <DummySlideItem />
      </Carousel>,
    );

    expect(getByTestId('carousel')).toBeInTheDocument();
    expect(getAllByTestId('dummy-slide')[0]).toBeInTheDocument();
  });
});
