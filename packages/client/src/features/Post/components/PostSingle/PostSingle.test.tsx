import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { buildPostCRUD } from '@dni/mock-server/src/crud';

import { cleanup, renderWithProviders } from 'utils/testUtils';

import PostSingle from './PostSingle';

describe('<PostSingle />', () => {
  const mock = new MockAdapter(axios);

  beforeAll(() => {
    mock.reset();
  });

  afterEach(cleanup);

  describe('#render', () => {
    const props = {
      postId: 22,
      isLoading: true,
      loadPost: jest.fn(),
    };

    it('should return spinner, if isLoading is true', () => {
      const { getByTestId } = renderWithProviders(<PostSingle {...props} />);

      expect(getByTestId('spinner')).toBeInTheDocument();
    });

    it('should return empty container, if !isLoading && !post', () => {
      const newProps = {
        ...props,
        isLoading: false,
      };

      const { getByText, getByTestId } = renderWithProviders(
        <PostSingle {...newProps} />,
      );

      expect(getByTestId('empty-container')).toBeInTheDocument();
      expect(
        getByText(
          'Unfortunately, we did not find any matches for your request',
        ),
      ).toBeInTheDocument();
    });

    it('should return emptyContainer, if post is archived', () => {
      const postsCRUD = buildPostCRUD(1);
      const post = postsCRUD.findAll()[0];

      const newProps = {
        ...props,
        isLoading: false,
        post: { ...post, archived: true },
      };

      const { getByText, getByTestId } = renderWithProviders(
        <PostSingle {...newProps} />,
      );

      expect(getByTestId('empty-container')).toBeInTheDocument();
      expect(getByText('Post has been archived')).toBeInTheDocument();
    });

    it('should return PostItem, if it is not archived and doesnt relate to network/event', () => {
      const postsCRUD = buildPostCRUD(1);
      const post = postsCRUD.findAll()[0];

      const newProps = {
        ...props,
        isLoading: false,
        post: {
          ...post,
          archived: false,
          network: undefined,
          event: undefined,
        },
      };

      const { getByTestId } = renderWithProviders(<PostSingle {...newProps} />);

      expect(getByTestId('post-item')).toBeInTheDocument();
    });

    it('should render PostItem, if event related post with user joined', () => {
      const postsCRUD = buildPostCRUD(1);
      const post = postsCRUD.findAll()[0];

      const newProps = {
        ...props,
        isLoading: false,
        post: {
          ...post,
          archived: false,
          network: undefined,
          event: { id: 1, title: 'mocked_event_title' },
        },
        events: [1, 2, 3],
      };

      // @ts-ignore
      const { getByTestId } = renderWithProviders(<PostSingle {...newProps} />);

      expect(getByTestId('post-item')).toBeInTheDocument();
    });

    it('should render empty container, if event related post with user not joined', () => {
      const postsCRUD = buildPostCRUD(1);
      const post = postsCRUD.findAll()[0];

      const newProps = {
        ...props,
        isLoading: false,
        post: {
          ...post,
          archived: false,
          network: undefined,
          event: { id: 5, title: 'mocked_event_title' },
        },
        events: [1, 2, 3],
      };

      // @ts-ignore
      const { getByText, getByTestId } = renderWithProviders(
        <PostSingle {...newProps} />,
      );

      expect(getByTestId('empty-container')).toBeInTheDocument();
      expect(getByText('mocked_event_title')).toBeInTheDocument();
    });

    it('should render PostItem, if network related post with user joined', () => {
      const postsCRUD = buildPostCRUD(1);
      const post = postsCRUD.findAll()[0];

      const newProps = {
        ...props,
        isLoading: false,
        post: {
          ...post,
          archived: false,
          event: undefined,
          network: { id: 1, title: 'mocked_network_title' },
        },
        networks: [1, 2, 3],
      };

      // @ts-ignore
      const { getByTestId } = renderWithProviders(<PostSingle {...newProps} />);

      expect(getByTestId('post-item')).toBeInTheDocument();
    });

    it('should render empty container, if network related post with user not joined', () => {
      const postsCRUD = buildPostCRUD(1);
      const post = postsCRUD.findAll()[0];

      const newProps = {
        ...props,
        isLoading: false,
        post: {
          ...post,
          archived: false,
          event: undefined,
          network: { id: 5, title: 'mocked_network_title' },
        },
        networks: [1, 2, 3],
      };

      // @ts-ignore
      const { getByText, getByTestId } = renderWithProviders(
        <PostSingle {...newProps} />,
      );

      expect(getByTestId('empty-container')).toBeInTheDocument();
      expect(getByText('mocked_network_title')).toBeInTheDocument();
    });
  });
});
