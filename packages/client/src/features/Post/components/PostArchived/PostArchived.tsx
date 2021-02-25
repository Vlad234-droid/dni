import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { TypeRenderPostArchived } from '../../config/types';
import { iconsSrc } from '../../config/media';
import {
  color,
  stylesPost,
  stylesWrapperIconControl,
  stylesTextMinDarkBaseNormal,
  stylesTextMinBaseInfoTextNormal,
  stylesTextMidDarkBaseBold,
  stylesWrapperAvatar,
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

const StyledArchiveEllipse = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: ${color.baseInfoText};
`;

const StyledArchiveLabel = styled.div`
  ${stylesTextMinBaseInfoTextNormal}
  padding-left: 8px;
`;

const StyledArchiveMark = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-height: 32px;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: ${color.darkBaseBackground};
`;

const StyledArchiveInfo = styled.div`
  ${stylesTextMinBaseInfoTextNormal}
  padding-left: 8px;
`;

const StyledArchiveBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
`;

const StyledWrapperIconControl = styled.div`
  ${stylesWrapperIconControl}
  cursor: pointer;
  background-color: ${color.whitePrimary};
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

const StyledPostArchived = styled.div`
  ${stylesPost}
  border: 1px solid ${color.innerPostBorder3};
  background-color: ${color.blueBackground};
`;

const postArchivedTestId = 'post-archived-test-id';

const PostArchived: TypeRenderPostArchived = ({ item, onDelete }) => {
  const dispatch = useDispatch();
  const [isDescriptionVisible, setVisible] = useState(false);

  const onPostClick = () => {
    setVisible(!isDescriptionVisible);
  };

  return (
    <StyledPostArchived onClick={onPostClick} data-testid={postArchivedTestId}>
      <StyledPostTitle>
        <StyledPublisherData>
          <StylesPublisherAvatar>
            <img src={item.createdBy?.avatarSrc} alt='publisher-avatar' />
          </StylesPublisherAvatar>
          <StyledPublisherName>{item.createdBy?.name}</StyledPublisherName>
          <StyledArchiveBox>
            <StyledArchiveMark>
              <StyledArchiveEllipse />
              <StyledArchiveLabel>Archived</StyledArchiveLabel>
            </StyledArchiveMark>
            <StyledArchiveInfo>hidden from other users</StyledArchiveInfo>
          </StyledArchiveBox>
        </StyledPublisherData>
        <StyledWrapperIconControl
          onClick={(event) => {
            event.stopPropagation();
            dispatch(onDelete(item));
          }}
        >
          <img src={iconsSrc.unarchive} />
        </StyledWrapperIconControl>
      </StyledPostTitle>
      {isDescriptionVisible && (
        <StyledPostContent>
          <StyledPostDescription>{item.description}</StyledPostDescription>
        </StyledPostContent>
      )}
    </StyledPostArchived>
  );
};

export default PostArchived;
export { postArchivedTestId };
