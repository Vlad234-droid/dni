import React from 'react';

import { renderWithTheme, cleanupAfterEach } from 'utils/testUtils';

import PageHeader, { TEST_ID } from './PageHeader';

const LEFT_TEST_ID = 'dummy-left';
const RIGHT_TEST_ID = 'dummy-right';
const CENTER_TEST_ID = 'dummy-center';

describe('#PageHeader', () => {
  cleanupAfterEach();

  const DummyLeftContent = () => <div data-testid={LEFT_TEST_ID} />;
  const DummyRightContent = () => <div data-testid={RIGHT_TEST_ID} />;
  const DummyCenterContent = () => <div data-testid={CENTER_TEST_ID} />;

  it('should render page header with correct left and right content', () => {
    const { getByTestId } = renderWithTheme(
      <PageHeader
        renderLeft={() => <DummyLeftContent />}
        renderRight={() => <DummyRightContent />}
        renderCenter={() => <DummyCenterContent />}
      />,
    );

    [
      getByTestId(TEST_ID),
      getByTestId(LEFT_TEST_ID),
      getByTestId(RIGHT_TEST_ID),
      getByTestId(CENTER_TEST_ID),
    ].forEach((el) => expect(el).toBeInTheDocument());
  });
});
