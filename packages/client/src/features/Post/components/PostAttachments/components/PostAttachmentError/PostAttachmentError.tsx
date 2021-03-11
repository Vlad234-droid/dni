import React, { FC } from 'react';
import styled from 'styled-components';

import { iconsSrc } from '../../../../config/media';

const PostAttachmentErrorIcon = styled.div`
  width: 39px;
  height: 43px;
  backbground-position: center;
  background-repeeat: no-repeat;
  background-image: url(${iconsSrc.fileError});
`;

const PostAttachmentErrorText = styled.div`
  font-size: 16px;
  line-height: 22px;
  padding-top: 22px;
  text-align: center;
  color: ${({ theme }) => theme.colors.error};
`;

const PostAttachmentErrorContent = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const PostAttachmentErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 186px;
  background-color: ${({ theme }) => theme.colors.background.base};
`;

interface PostAttachmentErrorProps {
  text: string;
}

const postAttachmentErrorTestId = 'post-attachment-error-test-id';

const PostAttachmentError: FC<PostAttachmentErrorProps> = ({ text }) => {
  return (
    <PostAttachmentErrorWrapper data-testid={postAttachmentErrorTestId}>
      <PostAttachmentErrorContent>
        <PostAttachmentErrorIcon />
        <PostAttachmentErrorText>{text}</PostAttachmentErrorText>
      </PostAttachmentErrorContent>
    </PostAttachmentErrorWrapper>
  );
};

export default PostAttachmentError;
export { postAttachmentErrorTestId };
