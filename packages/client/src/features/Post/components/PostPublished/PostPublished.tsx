import React, { FC } from 'react';

import { Post } from '../../config/types';
import { PostPublishedAttachments } from '../PostAttachments';
import PostControls from '../PostControls';
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
import ReadMoreReadLess from 'features/ReadMoreReadLess';

interface PostPublishedProps {
  item: Post;
}

const postPublishedTestId = 'post-published-test-id';

const PostPublished: FC<PostPublishedProps> = ({ item }) => {
  const {
    id,
    title,
    description,
    emotions,
    createdBy,
    created_at,
    updated_at,
    attachments,
  } = item;

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
          <PostPublisherName>
            {`${createdBy.firstName} ${createdBy.lastName}`}
          </PostPublisherName>
        </PostPublisher>
        <PostPublishDate>{new Date(created_at).toDateString()}</PostPublishDate>
      </PostHead>
      <PostContent>
        {attachments && attachments.length > 0 && (
          <PostPublishedAttachments attachments={attachments} />
        )}
        <PostTitle>{title}</PostTitle>
        <PostDescription>
          <ReadMoreReadLess
            value={description}
            readMoreText={'Read more'}
            readLessText={'Read less'}
          />
        </PostDescription>
        <PostControls id={id} emotions={emotions} />
      </PostContent>
    </PostPublishedWrapper>
  );
};

export default PostPublished;
export { postPublishedTestId };
