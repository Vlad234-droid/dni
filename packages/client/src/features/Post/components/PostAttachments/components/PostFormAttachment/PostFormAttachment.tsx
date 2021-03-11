import React, { FC, useEffect } from 'react';
import styled from 'styled-components';

import { cutFileName } from '../../../../utils';
import { iconsSrc } from '../../../../config/media';
import { UseFileReaderReturn } from '../../../../hooks';
import { Attachment, AttachmentStatus } from '../../../../config/types';
import PostAttachmentError from '../PostAttachmentError';
import PostAttachmentLoad from '../PostAttachmentLoad';
import PostAttachmentSuccess from '../PostAttachmentSuccess';

const PostFormAttachmentDeleteIcon = styled.div`
  top: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  overflow: hidden;
  position: absolute;
  border-radius: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${iconsSrc.delete});
  background-color: #f2f6fa;
`;

const PostFormAttachmentWrapper = styled.div`
  position: relative;
`;

interface PostFormAttachmentProps extends Attachment {
  onAttachmentLoadStart: UseFileReaderReturn['onAttachmentLoadStart'];
  onAttachmentLoadAbort: UseFileReaderReturn['onAttachmentLoadAbort'];
  onAttachmentDelete: UseFileReaderReturn['onAttachmentDelete'];
}

const postFormAttachmentTestId = 'post-form-attachment-test-id';

const PostFormAttachment: FC<PostFormAttachmentProps> = ({
  format,
  name,
  path,
  progress,
  status,
  onAttachmentLoadStart,
  onAttachmentLoadAbort,
  onAttachmentDelete,
}) => {
  const nameToView = cutFileName({ name, format, maxLength: 24 });

  useEffect(() => {
    if (status === AttachmentStatus.INIT) {
      onAttachmentLoadStart({ name });
    }

    if (status === AttachmentStatus.LOADING) {
      return () => onAttachmentLoadAbort({ name });
    }
  }, [status]);

  return (
    <PostFormAttachmentWrapper data-testid={postFormAttachmentTestId}>
      {status === AttachmentStatus.ERROR && (
        <PostAttachmentError text={'Upload error. Please, try again'} />
      )}
      {status === AttachmentStatus.LOADING && (
        <PostAttachmentLoad name={nameToView} progress={progress} />
      )}
      {status === AttachmentStatus.SUCCESS && (
        <PostAttachmentSuccess name={nameToView} path={path} format={format} />
      )}
      <PostFormAttachmentDeleteIcon
        onClick={() => onAttachmentDelete({ name })}
      />
    </PostFormAttachmentWrapper>
  );
};

export default PostFormAttachment;
export { postFormAttachmentTestId };
