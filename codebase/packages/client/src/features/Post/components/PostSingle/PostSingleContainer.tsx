import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';

import { getOne, byIdSelector } from '../../store';
import PostSingle from './PostSingle';

type Props = {
  postId: number;
};

const PostSingleContainer: FC<Props> = ({ postId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useStore((state) => state.posts);
  const { error: reactionsError } = useStore((state) => state.reactions);
  const post = useSelector(byIdSelector(postId));

  const loadPost = (id: number) => dispatch(getOne({ id }));

  return (
    <PostSingle
      loading={loading}
      loadPost={loadPost}
      post={post}
      postId={postId}
      error={error}
      reactionsError={reactionsError}
    />
  );
};

export default PostSingleContainer;
