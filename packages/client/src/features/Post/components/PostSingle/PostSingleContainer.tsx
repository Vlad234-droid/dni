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
  const { loading } = useStore((state) => state.posts);
  console.log('postId', postId);
  const post = useSelector(byIdSelector(postId));

  const loadPost = (id: number) => dispatch(getOne({ id }));

  return (
    <PostSingle
      loading={loading}
      loadPost={loadPost}
      post={post}
      postId={postId}
    />
  );
};

export default PostSingleContainer;
