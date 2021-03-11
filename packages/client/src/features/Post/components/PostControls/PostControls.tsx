import React, { FC } from 'react';
import styled from 'styled-components';

import { Emotion } from '../../config/types';
import { iconsSrc } from '../../config/media';
import { PostReaderHandler } from '../../store/handlers';
import PostEmotions from '../PostEmotions';

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

const PostControlsLeft = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  & > * {
    margin-top: 24px;
    margin-right: 8px;
  }
`;

const PostControlsRight = styled.div`
  display: flex;
  & > * {
    margin-top: 24px;
    margin-left: 12px;
    &: first-child {
      margin-left: 0;
    }
  }
`;

const PostControlsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
`;

interface PostControlsProps {
  id: number;
  emotions: Emotion[];
  handler: PostReaderHandler['published'];
}

const postControlsTestId = 'post-controls-test-id';

const PostControls: FC<PostControlsProps> = ({ emotions, handler, id }) => {
  return (
    <PostControlsWrapper data-testid={postControlsTestId}>
      <PostControlsLeft>
        <PostControlIcon iconSrc={iconsSrc.copy} />
        <PostEmotions
          emotions={emotions}
          onEmotionClick={({ variant }) => {
            handler.onPostLike({ id, variant });
          }}
          onPostUnlike={() => handler.onPostUnlike({ id })}
        />
      </PostControlsLeft>
      <PostControlsRight>
        <PostControlIcon
          iconSrc={iconsSrc.edit}
          onClick={() => handler.onPostEdit({ id })}
        />
        <PostControlIcon
          iconSrc={iconsSrc.archive}
          onClick={() => handler.onPostArchive({ id })}
        />
      </PostControlsRight>
    </PostControlsWrapper>
  );
};

export default PostControls;
export { postControlsTestId };
