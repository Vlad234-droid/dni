import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { buildPostCRUD } from '@dni/mock-server/src/crud';

import { cleanup, render } from 'utils/testUtils';
import Loading from 'types/loading';
import { UserRole } from 'features/User';

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
      loading: Loading.IDLE,
      loadPost: jest.fn(),
      networks: [1, 2, 3],
      events: [8, 9, 10],
    };

    it('should return spinner, if isLoading is true', () => {
      const newProps = {
        ...props,
        loading: Loading.PENDING,
      };
      const { getByTestId, queryByTestId } = render(<PostSingle {...newProps} />);

      expect(getByTestId('spinner')).toBeInTheDocument();
      expect(queryByTestId('post-item')).not.toBeInTheDocument();
    });

    it('should return error, if occurred', () => {
      const newProps = {
        ...props,
        loading: Loading.FAILED,
        error: 'mocked-error',
      };

      const { getByText, getByTestId, queryByTestId } = render(
        <PostSingle {...newProps} />
      );

      expect(getByTestId('error')).toBeInTheDocument();
      expect(
        getByText(
          'mocked-error',
        ),
      ).toBeInTheDocument();
      expect(queryByTestId('post-item')).not.toBeInTheDocument();
    });

    it('should render reactions error, if occurred', () => {
      const newProps = {
        ...props,
        loading: Loading.FAILED,
        reactionsError: 'mocked-reactions-error',
      };

      const { getByText, getByTestId, queryByTestId } = render(
        <PostSingle {...newProps} />
      );

      expect(getByTestId('error')).toBeInTheDocument();
      expect(
        getByText(
          'mocked-reactions-error',
        ),
      ).toBeInTheDocument();
      expect(queryByTestId('post-item')).not.toBeInTheDocument();
    });

    it('should return emptyContainer, if post is archived', () => {
      const postsCRUD = buildPostCRUD(1);
      const post = postsCRUD.findAll()[0];

      const newProps = {
        ...props,
        loading: Loading.SUCCEEDED,
        post: { ...post, archived: true },
      };

      const { getByText, getByTestId, queryByTestId } = render(
        <PostSingle {...newProps} />,
      );

      expect(getByTestId('empty-container')).toBeInTheDocument();
      expect(getByText('Post has been archived')).toBeInTheDocument();
      expect(queryByTestId('post-item')).not.toBeInTheDocument();
    });

    it('should return PostItem, if it is not archived', () => {
      const postsCRUD = buildPostCRUD(1);
      const post = postsCRUD.findAll()[0];

      const newProps = {
        ...props,
        loading: Loading.SUCCEEDED,
        post: {
          ...post,
          archived: false,
        },
      };

      const { getByTestId, queryByTestId } = render(<PostSingle {...newProps} />);

      expect(getByTestId('post-item')).toBeInTheDocument();
      expect(queryByTestId('empty-container')).not.toBeInTheDocument();
      expect(queryByTestId('error')).not.toBeInTheDocument();
      expect(queryByTestId('spinner')).not.toBeInTheDocument();
    });
  });

  describe('#useEffect', () => {
    it('should call loadPost with postId, if provided', () => {
      const postsCRUD = buildPostCRUD(1);
      const post = postsCRUD.findAll()[0];

      const props = {
        postId: post.id,
        loading: Loading.PENDING,
        loadPost: jest.fn(),
        loadReactions: jest.fn(),
        post,
      };

      render(<PostSingle {...props} />);

      expect(props.loadPost).toHaveBeenCalledTimes(1);
    });
  });
});
