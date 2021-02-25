import React, { createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { TypeRenderPostCreator } from '../../config/types';
import { selectors } from '../../store/selectors';
import { iconsSrc } from '../../config/media';
import {
  color,
  stylesPost,
  stylesWrapperAvatar,
  stylesTextMinDarkBaseNormal,
  stylesTextMidWhitePrimaryBold,
} from '../../styled';
import PostCustomSelect from '../PostCustomSelect';
import { PostFilesCreate } from '../PostAttachments';
import { CustomInputFile, CustomDropZone } from '../PostCustomInputs';
import Button from '@beans/button';
import Icon from '@beans/icon';
import { Wrapper } from '../../../About/components/AboutDescription/styled';

const StyledInputText = styled.input`
  ${stylesTextMinDarkBaseNormal}
  box-sizing: border-box;
  min-height: 40px;
  width: 100%;
  padding: 8px;
  outline: 0;
  border: 1px solid ${color.innerPostBorder2};
  background-color: ${color.whitePrimary};
`;

const StyledFieldset = styled.fieldset`
  border: 0;
  margin: 20px 0 0;
  padding: 0;
  display: flex;
`;

const StyledPostTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
`;

const StylesPublisherAvatar = styled.div`
  ${stylesWrapperAvatar};
  margin-right: 12px;
`;

const StyledPostContent = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledPostRightSide = styled.div`
  max-width: 472px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledPostCreator = styled.form`
  ${stylesPost}
  border: 1px solid ${color.innerPostBorder};
  background-color: ${color.lightPrimary};
`;

const postCreatorTestId = 'post-creator-test-id';

const PostCreator: TypeRenderPostCreator = ({
  item,
  onClick,
  onFileDrag,
  // onFileChange,
  // onPDFChange,
  // onPhotoChange,
  onFileDelete,
  onCustomSelectToggle,
  onPublisherChange,
  onDescriptionChange,
  onDescriptionFocus,
  onDescriptionBlur,
  onSubmitClick,
  fileUploadInfo,
}) => {
  const dispatch = useDispatch();
  const postCreatorRef = createRef<HTMLFormElement>();
  const isFileDragging = useSelector(selectors.getIsFileDragging);

  return (
    <StyledPostCreator
      ref={postCreatorRef}
      onClick={() => {
        dispatch(onClick());
      }}
      onDragEnter={onFileDrag}
      onSubmit={(event) => {
        event.preventDefault();
      }}
      data-testid={postCreatorTestId}
    >
      <StyledPostTitle>
        <StylesPublisherAvatar>
          <img src={item.createdBy?.avatarSrc} alt='publisher-avatar' />
        </StylesPublisherAvatar>
        <StyledPostRightSide>
          <PostCustomSelect
            onMenuToggle={onCustomSelectToggle}
            onOptionPick={onPublisherChange}
          />
        </StyledPostRightSide>
      </StyledPostTitle>
      <StyledPostContent>
        <StyledPostRightSide>
          <StyledFieldset>
            <StyledInputText
              type='text'
              value={item.description}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                dispatch(onDescriptionChange(event.currentTarget.value));
              }}
              onFocus={(event: React.FormEvent<HTMLInputElement>) => {
                dispatch(onDescriptionFocus(event.currentTarget.value));
              }}
              onBlur={(event: React.FormEvent<HTMLInputElement>) => {
                dispatch(onDescriptionBlur(event.currentTarget.value));
              }}
            />
          </StyledFieldset>
          <StyledFieldset>
            <CustomInputFile
              name='add photo'
              iconSrc={iconsSrc.addPhoto}
              onChange={() => {
                // dispatch(onPhotoChange(event.target.files[0]))
              }}
            />
            <CustomInputFile
              name='add file'
              iconSrc={iconsSrc.addFile}
              onChange={() => {
                // dispatch(onPhotoChange(event.target.files[0]))
              }}
            />
          </StyledFieldset>
          {isFileDragging && (
            <StyledFieldset>
              <CustomDropZone
                title='drop it here'
                info={fileUploadInfo}
                iconSrc={iconsSrc.filePlus}
                onChange={() => {
                  // dispatch(onPhotoChange(event.target.files[0]))
                }}
              />
            </StyledFieldset>
          )}
          {item.attachments.length > 0 && (
            <PostFilesCreate
              files={item.attachments}
              onFileDelete={onFileDelete}
            />
          )}
          <StyledFieldset>
            <Button
              variant='primary'
              onClick={() => {
                dispatch(onSubmitClick());
              }}
            >
              Publish
            </Button>
          </StyledFieldset>
        </StyledPostRightSide>
      </StyledPostContent>
    </StyledPostCreator>
  );
};

export default PostCreator;
export { postCreatorTestId };
