import React, { FC, useState } from 'react';

import { Post } from '../../config/types';
import {
  PostPublisherAvatar,
  PostPublisherAvatarBox,
  PostPublisherName,
  PostArchiveEllipse,
  PostArchiveLabel,
  PostArchiveMark,
  PostArchiveInfo,
  PostHead,
  PostTitle,
  PostDescription,
  PostContent,
  PostArchivedWrapper,
} from './styled';
import { useMedia } from 'context/InterfaceContext';

interface PostArchivedProps {
  item: Post;
}

const postArchivedTestId = 'post-archived-test-id';

const PostArchived: FC<PostArchivedProps> = ({ item }) => {
  const { id, title, description, createdBy } = item;
  const [isContentVisible, setVisible] = useState(false);

  const onPostClick = () => {
    setVisible(!isContentVisible);
  };

  const media = useMedia();

  return (
    <PostArchivedWrapper
      onClick={onPostClick}
      data-testid={postArchivedTestId}
      isMobile={media.isMobile}
    >
      <PostHead>
        <PostPublisherAvatarBox>
          {/* <PostPublisherAvatar src={createdBy.avatarSrc} /> */}
        </PostPublisherAvatarBox>
        <PostPublisherName>
            {`${createdBy.firstName} ${createdBy.lastName}`}
          </PostPublisherName>
        <PostArchiveMark>
          <PostArchiveEllipse />
          <PostArchiveLabel>Archived</PostArchiveLabel>
        </PostArchiveMark>
        <PostArchiveInfo>hidden from other users</PostArchiveInfo>
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
