import React from 'react';

import { renderWithTheme } from 'utils/testUtils';

import Picker from '../Picker';

describe('<Picker/>', () => {
  const props = {
    dateTime: {
      hh: '',
      mm: '',
    },
    render: jest.fn(),
    onChange: jest.fn(),
  };

  describe('#render', () => {
    const renderProps = {
      handleChange: expect.any(Function),
      isOpen: false,
      isValid: true,
      handleOpen: expect.any(Function),
      value: {
        hh: '',
        mm: '',
      },
    };

    it('should call render with default values', () => {
      renderWithTheme(<Picker {...props} />);

      expect(props.render).toHaveBeenCalledWith(renderProps);
    });
  });
});
