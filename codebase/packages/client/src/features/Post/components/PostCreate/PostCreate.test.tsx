import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { buildNetworkCRUD } from '@dni/mock-server/src/crud';

import { cleanup, fireEvent, render, screen, waitFor } from 'utils/testUtils';

import PostCreate from './PostCreate';
import Loading from "../../../../types/loading";

describe('<PostCreate />', () => {
  const mock = new MockAdapter(axios);

  beforeAll(() => {
    mock.reset();
  });

  afterEach(cleanup);

  const COLLECTION_SIZE = 1;
  const networkCRUD = buildNetworkCRUD(COLLECTION_SIZE);
  const networks = networkCRUD.findAll();

  const props = {
    onClose: jest.fn(),
    onSubmit: jest.fn(),
    networks,
    loading: Loading.SUCCEEDED,
  };

  describe('#render', () => {
    it('should render wrapper', () => {
      const { getByTestId } = render(<PostCreate {...props} />);

      expect(getByTestId('post-create')).toBeInTheDocument();
    });

    it('should render spinner, is isEmpty(props.networks) and !Loading.SUCCEEDED and !Loading.FAILED', () => {
      const newProps = {
        ...props,
        networks: [],
        loading: Loading.PENDING,
      };
      const { getByTestId } = render(<PostCreate {...newProps} />);

      expect(getByTestId('spinner')).toBeInTheDocument();
    });

    it('should render error, if props.error', () => {
      const newProps = {
        ...props,
        networks: [],
        loading: Loading.FAILED,
        error: 'mocked-error',
      };
      const { getByText } = render(<PostCreate {...newProps} />);

      expect(getByText('mocked-error')).toBeInTheDocument();
    });

    it('should render network dropdown, name input, location input, title input, story input, confirmation checkbox and policy link', () => {
      const { getByLabelText, getByText } = render(<PostCreate {...props} />);

      expect(getByLabelText('networkTitle')).toBeInTheDocument();
      expect(getByLabelText('name')).toBeInTheDocument();
      expect(getByLabelText('location')).toBeInTheDocument();
      expect(getByLabelText('title')).toBeInTheDocument();
      expect(getByLabelText('story')).toBeInTheDocument();
      expect(getByText('I agree to provide my personal story/data for the publication within this network. I understand that my story will be shared with the Network and will not be shared directly onto the site and that story may be shared in other locations, including the moderation version of my story.')).toBeInTheDocument();
      expect(getByText('Privacy Policy')).toBeInTheDocument();
    });

    it('should render submit and cancel buttons', () => {
      render(<PostCreate {...props} />);

      expect(screen.getByRole('button', { name: 'Cancel'})).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Submit'})).toBeInTheDocument();
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

      fireEvent.click(screen.getByRole('button', { name: 'Submit'}));

      await waitFor(() => {
        expect(screen.queryAllByText('Field is required')).toHaveLength(2);
        expect(screen.queryAllByText('Must be accepted')).toHaveLength(1);
        expect(props.onSubmit).not.toHaveBeenCalled();
      });
    });

    it('should call props.onSubmit with formData', async () => {
      const { getByLabelText, getByRole } = render(<PostCreate {...props} />);

      fireEvent.input(getByLabelText('name'), {
        target: { value: 'mocked-name' }
      });

      fireEvent.input(getByLabelText('location'), {
        target: { value: 'mocked-location' }
      });

      fireEvent.input(getByLabelText('title'), {
        target: { value: 'mocked-title' }
      });

      fireEvent.input(getByLabelText('story'), {
        target: { value: 'mocked-story' }
      });

      fireEvent.click(getByRole('checkbox'));

      const formData = {
        networkTitle: props.networks[0].title,
        title: 'mocked-title',
        story: 'mocked-story',
        name: 'mocked-name',
        location: 'mocked-location',
        confirm: true,
      };

      fireEvent.click(screen.getByRole('button', { name: 'Submit'}));

      await waitFor(() => {
        expect(props.onSubmit).toHaveBeenCalledWith(formData, props.networks[0]);
      });
    });
  });
});
