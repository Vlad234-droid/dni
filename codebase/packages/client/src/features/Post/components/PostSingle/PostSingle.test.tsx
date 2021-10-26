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
  const renderOptions = { roles: [UserRole.EMPLOYEE], events: [], networks: [] };

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
      const { getByTestId } = render(<PostSingle {...newProps} />, renderOptions);

      expect(getByTestId('spinner')).toBeInTheDocument();
    });

    it('should return error, if occurred', () => {
      const newProps = {
        ...props,
        loading: Loading.FAILED,
        error: 'mocked-error',
      };

      const { getByText, getByTestId } = render(
        <PostSingle {...newProps} />, renderOptions
      );

      expect(getByTestId('error')).toBeInTheDocument();
      expect(
        getByText(
          'mocked-error',
        ),
      ).toBeInTheDocument();
    });

    it('should return emptyContainer, if post is archived', () => {
      const postsCRUD = buildPostCRUD(1);
      const post = postsCRUD.findAll()[0];

      const newProps = {
        ...props,
        loading: Loading.SUCCEEDED,
        post: { ...post, archived: true },
      };

      const { getByText, getByTestId } = render(
        <PostSingle {...newProps} />, renderOptions,
      );

      expect(getByTestId('empty-container')).toBeInTheDocument();
      expect(getByText('Post has been archived')).toBeInTheDocument();
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

      const { getByTestId } = render(<PostSingle {...newProps} />, renderOptions);

      expect(getByTestId('post-item')).toBeInTheDocument();
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

      render(<PostSingle {...props} />, renderOptions);

      expect(props.loadPost).toHaveBeenCalledTimes(1);
    });
  });
});
