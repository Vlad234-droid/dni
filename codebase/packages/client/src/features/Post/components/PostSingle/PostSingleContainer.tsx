import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';
import { getReactionsList } from 'features/Reactions';

import { getOne, byIdSelector } from '../../store';
import PostSingle from './PostSingle';

type Props = {
  postId: number;
};

const PostSingleContainer: FC<Props> = ({ postId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useStore((state) => state.posts);
  const post = useSelector(byIdSelector(postId));

  const loadPost = (id: number) => dispatch(getOne({ id }));

  const loadReactions = (id: number) => dispatch(getReactionsList({ id_in: [id] }));

  return (
    <PostSingle
      loading={loading}
      loadPost={loadPost}
      loadReactions={loadReactions}
      post={post}
      postId={postId}
      error={error}
    />
  );
};

export default PostSingleContainer;
