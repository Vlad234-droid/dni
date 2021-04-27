import { FC, useState } from 'react';

import { Post } from '../../config/types';
import {
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
  const { title, content, authorName } = item;
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
        <PostPublisherName>{`${authorName}`}</PostPublisherName>
        <PostArchiveMark>
          <PostArchiveEllipse />
          <PostArchiveLabel>Archived</PostArchiveLabel>
        </PostArchiveMark>
        <PostArchiveInfo>hidden from other users</PostArchiveInfo>
      </PostHead>
      {isContentVisible && (
        <PostContent>
          {title && <PostTitle>{title}</PostTitle>}
          <PostDescription>{content}</PostDescription>
        </PostContent>
      )}
    </PostArchivedWrapper>
  );
};

export default PostArchived;
export { postArchivedTestId };
