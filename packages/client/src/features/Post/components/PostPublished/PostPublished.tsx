import React from 'react';
import styled from 'styled-components';

import { TypeRenderPostPublished } from '../../config/types';
import PostControls from '../PostControls';
import { PostFilesView } from '../PostAttachments';
import {
  color,
  stylesPost,
  stylesWrapperAvatar,
  stylesTextMidDarkBaseBold,
  stylesTextMinBaseInfoTextNormal,
  stylesTextMinDarkBaseNormal,
} from '../../styled';

const StylesPublisherAvatar = styled.div`
  ${stylesWrapperAvatar};
  margin-right: 12px;
`;

const StyledPublisherName = styled.div`
  ${stylesTextMidDarkBaseBold}
`;

const StyledPublisherData = styled.div`
  display: flex;
  align-items: center;
  padding-right: 24px;
`;

const StyledPublishDate = styled.div`
  ${stylesTextMinBaseInfoTextNormal}
`;

const StyledPostTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledPostDescription = styled.div`
  ${stylesTextMinDarkBaseNormal}
`;

const StyledPostContent = styled.div`
  padding-top: 16px;
`;

const StyledPostPublished = styled.div`
  ${stylesPost}
  border: 1px solid ${color.innerPostBorder2};
  background-color: ${color.whitePrimary};
`;

const postPublishedTestId = 'post-published-test-id';

const PostPublished: TypeRenderPostPublished = ({
  item,
  onEdit,
  onDelete,
  onArchive,
  onCopyLink,
  onLikeChoice,
}) => {
  return (
    <StyledPostPublished data-testid={postPublishedTestId}>
      <StyledPostTitle>
        <StyledPublisherData>
          <StylesPublisherAvatar>
            <img src={item.createdBy?.avatarSrc} alt='user-avatar' />
          </StylesPublisherAvatar>
          <StyledPublisherName>{item.createdBy?.name}</StyledPublisherName>
        </StyledPublisherData>
        <StyledPublishDate>{item.createdAt}</StyledPublishDate>
      </StyledPostTitle>
      <StyledPostContent>
        {item.attachments.length > 0 && (
          <PostFilesView files={item.attachments} />
        )}
        <StyledPostDescription>{item.description}</StyledPostDescription>
        <PostControls
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onArchive={onArchive}
          onCopyLink={onCopyLink}
          onLikeChoice={onLikeChoice}
        />
      </StyledPostContent>
    </StyledPostPublished>
  );
};

export default PostPublished;
export { postPublishedTestId };
