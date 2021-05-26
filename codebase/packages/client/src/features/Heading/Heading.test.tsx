import React from 'react';

import { renderWithTheme, cleanupAfterEach } from 'utils/testUtils';

import Heading, { Size, Color, TEST_ID } from './Heading';

type CaseTuple = [Size, string, string, Color];

const cases: CaseTuple[] = [
  [Size.md, 'Tes', '24px', Color.black],
  [Size.xl, 'Test', '32px', Color.main],
  [Size.xxl, 'Test1', '36px', Color.black],
];

describe('#Heading', () => {
  cleanupAfterEach();

  it.each(cases)(
    'should render heading with %p size and content %p',
    (size, content, expectedSize, color) => {
      const { getByTestId } = renderWithTheme(
        <Heading size={size} color={color}>
          {content}
        </Heading>,
      );

      const heading = getByTestId(TEST_ID);

      expect(heading).toHaveAttribute('font-size', expectedSize);
      expect(heading).toHaveAttribute('color', color);
      expect(heading).toHaveTextContent(content);
    },
  );
});
