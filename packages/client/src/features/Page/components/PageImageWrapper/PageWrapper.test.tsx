import React from 'react';

import { renderWithTheme, cleanupAfterEach } from 'utils/testUtils';

import PageImageWrapper, { TEST_ID } from './PageImageWrapper';

const CONTENT_TEST_ID = 'dummy-content';

describe('#PageWrapper', () => {
  cleanupAfterEach();

  const DummyContent = () => <div data-testid={CONTENT_TEST_ID} />;

  it('should render page header with correct left and right content', () => {
    const { getByTestId } = renderWithTheme(
      <PageImageWrapper renderImage={() => <div>test image</div>}>
        <DummyContent />
      </PageImageWrapper>,
    );

    [getByTestId(TEST_ID), getByTestId(CONTENT_TEST_ID)].forEach((el) =>
      expect(el).toBeInTheDocument(),
    );
  });
});
