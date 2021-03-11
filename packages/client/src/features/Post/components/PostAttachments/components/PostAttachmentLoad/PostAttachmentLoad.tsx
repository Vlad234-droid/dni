import React, { FC, useEffect } from 'react';
import styled from 'styled-components';

import { iconsSrc } from '../../../../config/media';
import ProgressBar from '../../../ProgressBar';

const PostAttachmentLoadIcon = styled.div`
  width: 54px;
  height: 41px;
  backbground-position: center;
  background-repeeat: no-repeat;
  background-image: url(${iconsSrc.fileLoad});
`;

const PostAttachmentLoadText = styled.div`
  font-size: 16px;
  line-height: 22px;
  padding-top: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`;

const PostAttachmentLoadContent = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const PostAttachmentLoadWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 186px;
  background-color: ${({ theme }) => theme.colors.background.base};
`;

interface PostAttachmentLoadProps {
  name: string;
  progress: number;
}

const postAttachmentLoadTestId = 'post-attachment-load-test-id';

const PostAttachmentLoad: FC<PostAttachmentLoadProps> = ({
  name,
  progress,
}) => {

  return (
    <PostAttachmentLoadWrapper data-testid={postAttachmentLoadTestId}>
      <ProgressBar
        progress={progress}
        color={{
          from: '248, 228, 165',
          to: '197, 242, 175, 0',
        }}
      />
      <PostAttachmentLoadContent>
        <PostAttachmentLoadIcon />
        <PostAttachmentLoadText>{name}</PostAttachmentLoadText>
      </PostAttachmentLoadContent>
    </PostAttachmentLoadWrapper>
  );
};

export default PostAttachmentLoad;
export { postAttachmentLoadTestId };
