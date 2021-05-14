import React, { FC, useEffect, useMemo } from 'react';
import Link from '@beans/link';

import { EmptyContainer, Spinner, BackLink } from 'features/Common';
import { Page } from 'features/Page';

import { Post } from '../../config/types';
import PostItem from '../PostItem';
import { BackLinkWrapper } from './styled';

type Props = {
  postId: number;
  isLoading: boolean;
  networks?: number[];
  events?: number[];
  loadPost: (id: number) => void;
  post?: Post;
};

const PostSingle: FC<Props> = ({
  postId,
  loadPost,
  isLoading,
  post,
  events,
  networks,
}) => {
  useEffect(() => {
    if (postId) {
      loadPost(postId);
    }
  }, [postId]);

  const memoizedContent = useMemo(() => {
    if (isLoading) return <Spinner height='500px' />;

    if (!post) {
      return (
        <EmptyContainer description='Unfortunately, we did not find any matches for your request' />
      );
    }

    if (post.archived)
      return <EmptyContainer description='Post has been archived' />;

    return <PostItem item={post} />;
  }, [post, networks, events, isLoading]);

  return (
    <div>
      <BackLinkWrapper>
        <BackLink to={`/${Page.NETWORK_NEWS}`} text='Back to Network News' />
      </BackLinkWrapper>
      {memoizedContent}
    </div>
  );
};

export default PostSingle;
