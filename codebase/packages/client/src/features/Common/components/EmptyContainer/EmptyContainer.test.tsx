import React from 'react';

import { render } from 'utils/testUtils';

import EmptyContainer from './EmptyContainer';

describe('<EmptyContainer />', () => {
  describe('#render', () => {
    it('should render correctly, if description is of type string', () => {
      const props = {
        description: 'mocked_description',
      };

      const { getByTestId, getByText } = render(
        <EmptyContainer {...props} />,
      );

      expect(getByTestId('empty-icon')).toBeInTheDocument();
      expect(getByText('mocked_description')).toBeInTheDocument();
    });

    it('should render correctly, if description is of type element', () => {
      const props = {
        description: <div>mocked_description</div>,
      };

      const { getByTestId, getByText } = render(
        <EmptyContainer {...props} />,
      );

      expect(getByTestId('empty-icon')).toBeInTheDocument();
      expect(getByText('mocked_description')).toBeInTheDocument();
    });

    it('should render explanation, if it is provided', () => {
      const props = {
        description: <div>mocked_description</div>,
        explanation: 'mocked_explanation',
      };

      const { getByText } = render(<EmptyContainer {...props} />);

      expect(getByText('mocked_explanation')).toBeInTheDocument();
    });
  });
});
