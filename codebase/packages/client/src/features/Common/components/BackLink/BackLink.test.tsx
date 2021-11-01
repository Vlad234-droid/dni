import React from 'react';

import { render } from 'utils/testUtils';

import BackLink from './BackLink';

describe('<BackLink />', () => {
  const props = {
    to: '/mocked_to',
    text: 'mocked_text',
  };

  describe('#render', () => {
    it('should render correctly', () => {
      const { getByTestId, getByText } = render(
        <BackLink {...props} />,
      );

      expect(getByTestId('back-button')).toBeInTheDocument();
      expect(getByTestId('back-icon')).toBeInTheDocument();
      expect(getByText('mocked_text')).toBeInTheDocument();
    });

    it('should render with default text, if it is not in props', () => {
      const props = {
        to: '/mocked_to',
      };

      const { getByText } = render(<BackLink {...props} />);

      expect(getByText('Back')).toBeInTheDocument();
    });
  });
});
