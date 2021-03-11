import React, { FC, DragEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import { User, Post, PostForm as PostFormItem } from '../../config/types';
import { useDragAndDrop, useFileReader } from '../../hooks';
import { PostFormPublishersSelector } from '../../store/selectors';
import { PostCreatorHandler, PostUpdaterHandler } from '../../store/handlers';
import PostSelect from '../PostFormSelect';
import PostFormTextarea from '../PostFormTextarea';
import PostFormInputsFile from '../PostFormInputsFile';
import PostDropZone from '../PostDropZone';
import { PostFormAttachments } from '../PostAttachments';
import {
  PostPublisherAvatar,
  PostPublisherAvatarBox,
  PostPublishersSelectBox,
  PostFormFieldset,
  PostFormInputSubmit,
  PostHead,
  PostContent,
  PostContentBox,
  PostFormWrapper,
} from './styled';

interface PostFormProps {
  item: Post | PostFormItem;
  handler: PostCreatorHandler | PostUpdaterHandler;
  publishersSelector: PostFormPublishersSelector;
}

const testId = 'post-form-test-id';

const PostForm: FC<PostFormProps> = ({ item, handler, publishersSelector }) => {
  const { id, title, description, attachments, createdBy } = item;

  const publishers = useSelector(publishersSelector);

  const {
    onFilesReadFromTransfer,
    onFilesReadFromInput,
    onAttachmentLoadStart,
    onAttachmentLoadAbort,
    onAttachmentDelete,
    cleanReadingProcess,
  } = useFileReader({
    id,
    onAttachmentAdd: handler.onAttachmentAdd,
    onAttachmentInitError: handler.onAttachmentInitError,
    onAttachmentLoadError: handler.onAttachmentLoadError,
    onAttachmentLoadProgress: handler.onAttachmentLoadProgress,
    onAttachmentLoadSuccess: handler.onAttachmentLoadSuccess,
    onAttachmentDelete: handler.onAttachmentDelete,
  });

  const onFilesDrop = (event: DragEvent) => {
    onFilesReadFromTransfer({ event, formats: ['png', 'jpg', 'gif', 'pdf'] });
  };

  const {
    dropZoneRef,
    dragZoneProps,
    isDropZoneVisible,
    isDropZoneActive,
    onDropZoneDragLeave,
  } = useDragAndDrop({ onFilesDrop });

  return (
    <PostFormWrapper
      {...dragZoneProps}
      data-testid={testId}
      onSubmit={(event) => {
        handler.onSubmit({ id, event, cleanReadingProcess });
      }}
    >
      <PostHead>
        <PostPublisherAvatarBox>
          <PostPublisherAvatar src={createdBy.avatarSrc} />
        </PostPublisherAvatarBox>
        <PostPublishersSelectBox>
          <PostSelect
            value={createdBy}
            options={publishers}
            optionsTitle={'Publish as'}
            onOptionClick={(publisher: User) => {
              handler.onPublisherOptionClick({ id, publisher });
            }}
          />
        </PostPublishersSelectBox>
      </PostHead>
      <PostContent>
        <PostContentBox>
          <PostFormFieldset>
            <PostFormTextarea
              defaultValue={'Write Something'}
              onTextChange={({ value }) => {
                handler.onTextareaChange({ id, value });
              }}
              toolTipText={'First line of text will become Title'}
              stateValue={
                title && `${title} ${description && '\n\n' + description}`
              }
            />
          </PostFormFieldset>
          <PostFormFieldset>
            <PostFormInputsFile onFilesRead={onFilesReadFromInput} />
          </PostFormFieldset>
          {isDropZoneVisible && (
            <PostFormFieldset>
              <PostDropZone
                _ref={dropZoneRef}
                isActive={isDropZoneActive}
                onDragLeave={onDropZoneDragLeave}
                info={'PNG, JPG, GIF or PDF, each file less than 20 mb'}
                title={'Drop it here'}
              />
            </PostFormFieldset>
          )}
          {attachments.length > 0 && (
            <PostFormFieldset>
              <PostFormAttachments
                attachments={attachments}
                onAttachmentLoadStart={onAttachmentLoadStart}
                onAttachmentLoadAbort={onAttachmentLoadAbort}
                onAttachmentDelete={onAttachmentDelete}
              />
            </PostFormFieldset>
          )}
          {title && title !== 'Write Something' && (
            <PostFormFieldset>
              <PostFormInputSubmit value='Publish' />
            </PostFormFieldset>
          )}
        </PostContentBox>
      </PostContent>
    </PostFormWrapper>
  );
};

export default PostForm;
