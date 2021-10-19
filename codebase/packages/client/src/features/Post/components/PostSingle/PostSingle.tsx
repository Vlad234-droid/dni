import React, { FC, useEffect, useMemo } from 'react';

import { EmptyContainer, Spinner, BackLink, Error } from 'features/Common';
import { Page } from 'features/Page';
import Loading from 'types/loading';

import { Post } from '../../config/types';
import PostItem from '../PostItem';
import { BackLinkWrapper } from './styled';

type Props = {
  postId: number;
  loading: Loading;
  loadPost: (id: number) => void;
  loadReactions: (id: number) => void;
  post?: Post;
  error?: string;
};

const PostSingle: FC<Props> = ({ postId, loadPost, loadReactions, loading, post, error }) => {
  const isLoading = useMemo(() => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED, [loading]);

  useEffect(() => {
    if (postId) {
      loadPost(postId);
      loadReactions(postId);
    }
  }, [postId]);

  const memoizedContent = useMemo(() => {
    if (error) return <Error errorData={{ title: error }} fullWidth />;

    if (!post && isLoading) return <Spinner height='500px' />;

    if (post && post!.archived) return <EmptyContainer description='Post has been archived' />;

    return post ? <PostItem item={post} /> : null;
  }, [post, error, loading]);

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
