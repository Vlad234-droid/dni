import React, { FC, useState } from 'react';

import { Post } from '../../config/types';
import { PostReaderHandler } from '../../store/handlers';
import {
  PostPublisherAvatar,
  PostPublisherAvatarBox,
  PostPublisherName,
  PostArchiveEllipse,
  PostArchiveLabel,
  PostArchiveMark,
  PostArchiveInfo,
  PostUnarchiveIcon,
  PostHead,
  PostTitle,
  PostDescription,
  PostContent,
  PostArchivedWrapper,
} from './styled';

interface PostArchivedProps {
  item: Post;
  handler: PostReaderHandler['archived'];
}

const postArchivedTestId = 'post-archived-test-id';

const PostArchived: FC<PostArchivedProps> = ({ handler, item }) => {
  const { id, title, description, createdBy } = item;
  const [isContentVisible, setVisible] = useState(false);

  const onPostClick = () => {
    setVisible(!isContentVisible);
  };

  return (
    <PostArchivedWrapper onClick={onPostClick} data-testid={postArchivedTestId}>
      <PostHead>
        <PostPublisherAvatarBox>
          <PostPublisherAvatar src={createdBy.avatarSrc} />
        </PostPublisherAvatarBox>
        <PostPublisherName>{createdBy.name}</PostPublisherName>
        <PostArchiveMark>
          <PostArchiveEllipse />
          <PostArchiveLabel>Archived</PostArchiveLabel>
        </PostArchiveMark>
        <PostArchiveInfo>hidden from other users</PostArchiveInfo>
        <PostUnarchiveIcon onClick={() => handler.onPostUnarchive({ id })} />
      </PostHead>
      {isContentVisible && (
        <PostContent>
          {title && <PostTitle>{title}</PostTitle>}
          <PostDescription>{description}</PostDescription>
        </PostContent>
      )}
    </PostArchivedWrapper>
  );
};

export default PostArchived;
export { postArchivedTestId };
