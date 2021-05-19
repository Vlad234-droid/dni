import React, { FC, useEffect, useMemo } from 'react';

import { EmptyContainer, Spinner, BackLink } from 'features/Common';
import { Page } from 'features/Page';
import Loading from 'types/loading';

import { Post } from '../../config/types';
import PostItem from '../PostItem';
import { BackLinkWrapper } from './styled';

type Props = {
  postId: number;
  loading: Loading;
  networks?: number[];
  events?: number[];
  loadPost: (id: number) => void;
  post?: Post;
};

const PostSingle: FC<Props> = ({ postId, loadPost, loading, post }) => {
  console.log('post', post, loading);
  const isLoading = useMemo(
    () => loading !== Loading.SUCCEEDED && loading !== Loading.FAILED,
    [loading],
  );

  useEffect(() => {
    if (postId) {
      loadPost(postId);
    }
  }, [postId]);

  const memoizedContent = useMemo(() => {
    if (post && post!.archived)
      return <EmptyContainer description='Post has been archived' />;

    return <PostItem item={post!} />;
  }, [post]);

  return (
    <div>
      <BackLinkWrapper>
        <BackLink to={`/${Page.NETWORK_NEWS}`} text='Back to Network News' />
      </BackLinkWrapper>
      {loading === Loading.FAILED && <div>Here some error</div>}
      {!post && isLoading && <Spinner height='500px' />}
      {loading === Loading.SUCCEEDED && post && memoizedContent}
    </div>
  );
};

export default PostSingle;
