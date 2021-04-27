import React, { FC } from 'react';

import { Post } from '../../config/types';
import { PostPublishedAttachments } from '../PostAttachments';
import {
  // PostPublisherAvatar,
  PostPublisherAvatarBox,
  PostPublisherName,
  PostPublisher,
  PostPublishDate,
  PostHead,
  PostTitle,
  PostDescription,
  PostContent,
  PostPublishedWrapper,
} from './styled';
import { useMedia } from 'context/InterfaceContext';

interface PostPublishedProps {
  item: Post;
}

const postPublishedTestId = 'post-published-test-id';

const PostPublished: FC<PostPublishedProps> = ({ item }) => {
  const { title, content, authorName, published_at, attachments } = item;
  const media = useMedia();

  return (
    <PostPublishedWrapper
      data-testid={postPublishedTestId}
      isMobile={media.isMobile}
    >
      <PostHead>
        <PostPublisher>
          <PostPublisherAvatarBox>
            {/* <PostPublisherAvatar src={createdBy.avatar} /> */}
          </PostPublisherAvatarBox>
          <PostPublisherName>{`${authorName}`}</PostPublisherName>
        </PostPublisher>
        <PostPublishDate>
          {new Date(published_at).toDateString()}
        </PostPublishDate>
      </PostHead>
      <PostContent>
        {attachments && attachments.length > 0 && (
          <PostPublishedAttachments attachments={attachments} />
        )}
        <PostTitle>{title}</PostTitle>
        <PostDescription>{content}</PostDescription>
        {/* <PostControls id={id} emotions={emotions} /> */}
      </PostContent>
    </PostPublishedWrapper>
  );
};

export default PostPublished;
export { postPublishedTestId };
