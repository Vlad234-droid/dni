import React from 'react';

import { renderWithTheme, cleanupAfterEach } from 'utils/testUtils';

import Wrapper, { TEST_ID } from './Wrapper';

const CONTENT_TEST_ID = 'dummy-content';

describe('#PageHeader', () => {
  cleanupAfterEach();

  const DummyContent = () => <div data-testid={CONTENT_TEST_ID} />;

  it('should render page header with correct left and right content', () => {
    const { getByTestId } = renderWithTheme(
      <Wrapper>
        <DummyContent />
      </Wrapper>,
    );

    [getByTestId(TEST_ID), getByTestId(CONTENT_TEST_ID)].forEach((el) =>
      expect(el).toBeInTheDocument(),
    );
  });
});
