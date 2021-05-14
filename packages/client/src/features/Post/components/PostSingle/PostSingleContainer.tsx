import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import useDispatch from 'hooks/useDispatch';
import useStore from 'hooks/useStore';

import PostSingle from './PostSingle';
import { getOne, byIdSelector } from '../../store';

type Props = {
  postId: number;
};

const PostSingleContainer: FC<Props> = ({ postId }) => {
  const dispatch = useDispatch();
  const { isLoading } = useStore((state) => state.posts);
  const { networks, events } = useStore((state) => state.auth.user);
  const post = useSelector(byIdSelector(postId));

  const loadPost = (id: number) => dispatch(getOne({ id }));

  return (
    <PostSingle
      isLoading={isLoading}
      networks={networks}
      events={events}
      loadPost={loadPost}
      post={post}
      postId={postId}
    />
  );
};

export default PostSingleContainer;
