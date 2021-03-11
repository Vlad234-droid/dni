import React from 'react';

import { renderWithTheme } from 'utils/testUtils';

import Carousel, { TEST_ID } from './Carousel';
import CarouselContent from '../CarouselContent';

const SLIDE_TEST_ID = 'dummy-slide';

describe('#Carousel', () => {
  const DummySlideItem = () => (
    <div data-testid={SLIDE_TEST_ID}>
      <CarouselContent
        title='test'
        description='test'
        subTitle='test'
        subDescription='test'
        image={{
          src: 'test',
        }}
      />
    </div>
  );

  it('should render carousel with slide', () => {
    const { getByTestId, getAllByTestId } = renderWithTheme(
      <Carousel id='test-carousel'>
        <DummySlideItem />
        <DummySlideItem />
      </Carousel>,
    );

    expect(getByTestId(TEST_ID)).toBeInTheDocument();
    expect(getAllByTestId(SLIDE_TEST_ID)[0]).toBeInTheDocument();
  });
});
