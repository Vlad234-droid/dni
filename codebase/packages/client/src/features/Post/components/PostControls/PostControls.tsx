import React, { FC } from 'react';
import styled from 'styled-components';

import PostEmotions, { Emotion } from '../PostEmotions';
import { iconsSrc } from '../../config/media';

const PostControlIcon = styled.div<{
  iconSrc: string;
}>`
  width: 40px;
  height: 40px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${({ iconSrc }) => iconSrc});
  background-color: ${({ theme }) => theme.colors.tost};
`;

const PostControlsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  & > * {
    margin-top: 24px;
    margin-right: 8px;
  }
`;

interface PostControlsProps {
  id: number | string;
  emotions: Emotion[];
}

const postControlsTestId = 'post-controls-test-id';

const PostControls: FC<PostControlsProps> = ({ emotions, id }) => {
  return (
    <PostControlsWrapper data-testid={postControlsTestId}>
      <PostControlIcon iconSrc={iconsSrc.copy} />
      <PostEmotions
        emotions={emotions}
        onEmotionClick={({ variant }) => {
          // onPostLike({ id, variant });
        }}
        onPostUnlike={() => {
          // onPostUnlike({ id })
        }}
      />
    </PostControlsWrapper>
  );
};

export default PostControls;
export { postControlsTestId };
