import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { cleanup, fireEvent, render, screen, waitFor } from 'utils/testUtils';

import PostCreate from './PostCreate';

describe('<PostCreate />', () => {
  const mock = new MockAdapter(axios);

  beforeAll(() => {
    mock.reset();
  });

  afterEach(cleanup);

  const props = {
    onClose: jest.fn(),
    onSubmit: jest.fn(),
  };

  describe('#render', () => {
    it('should render wrapper', () => {
      const { getByTestId } = render(<PostCreate {...props} />);

      expect(getByTestId('post-create')).toBeInTheDocument();
    });

    it('should render title input, story input, confirmation checkbox and policy link', () => {
      const { getByLabelText, getByText } = render(<PostCreate {...props} />);

      expect(getByLabelText('title')).toBeInTheDocument();
      expect(getByLabelText('story')).toBeInTheDocument();
      expect(getByText('I agree to provide my personal story/data for the publication within this network. I understand that my story will be shared with the Network and will not be shared directly onto the site and that story may be shared in other locations, including the moderation version of my story.')).toBeInTheDocument();
      expect(getByText('Privacy Policy')).toBeInTheDocument();
    });

    it('should render publish and cancel buttons', () => {
      render(<PostCreate {...props} />);

      expect(screen.getByRole('button', { name: 'Cancel'})).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Publish'})).toBeInTheDocument();
    });
  });

  describe('#handlers', () => {
    it('should call props.onClose, when Cancel button clicked', () => {
      render(<PostCreate {...props} />);

      fireEvent.click(screen.getByRole('button', { name: 'Cancel'}));

      expect(props.onClose).toHaveBeenCalled();
    });

    it('should display errors and not call props.onSubmit, if validation failed', async () => {
      render(<PostCreate {...props} />);

      fireEvent.click(screen.getByRole('button', { name: 'Publish'}));

      await waitFor(() => {
        expect(screen.queryAllByText('Field is required')).toHaveLength(2);
        expect(props.onSubmit).not.toHaveBeenCalled();
      });
    });

    it('should call props.onSubmit with formData', async () => {
      const { getByLabelText, getByRole } = render(<PostCreate {...props} />);

      fireEvent.input(getByLabelText('title'), {
        target: { value: 'mocked-title' }
      });

      fireEvent.input(getByLabelText('story'), {
        target: { value: 'mocked-story' }
      });

      fireEvent.click(getByRole('checkbox'));

      const formData = {
        title: 'mocked-title',
        story: 'mocked-story',
        confirm: true,
      };

      fireEvent.click(screen.getByRole('button', { name: 'Publish'}));

      await waitFor(() => {
        expect(props.onSubmit).toHaveBeenCalledWith(formData);
      });
    });
  });
});
