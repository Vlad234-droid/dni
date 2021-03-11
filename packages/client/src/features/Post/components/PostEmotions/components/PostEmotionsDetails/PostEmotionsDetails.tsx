import React, { FC } from 'react';
import styled from 'styled-components';

import { Emotion } from '../../../../config/types';
import { PostEmotionIconSmall } from '../PostEmotionIcons';

const PostEmotionDetailsCounter = styled.div`
  margin-left: 8px;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.primary};
`;

const PostEmotionsItem = styled.div`
  display: flex;
  align-items: center;
`;

const PostEmotionsDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 1px 1px 6px 0 ${({ theme }) => theme.colors.lines.base};
  background-color: ${({ theme }) => theme.colors.background.dark};
  & > * {
    margin-top: 8px;
    &:first-child {
      margin-top: 0;
    }
  }
`;

interface PostEmotionsDetailsProps {
  emotions: Emotion[];
}

const postEmotionsDetailsTestId = 'post-emotions-details-test-id';

const PostEmotionsDetails: FC<PostEmotionsDetailsProps> = ({ emotions }) => {
  return (
    <PostEmotionsDetailsWrapper data-testid={postEmotionsDetailsTestId}>
      {emotions.map(({ id, image, count }) => {
        return (
          <PostEmotionsItem key={id}>
            <PostEmotionIconSmall iconSrc={image} />
            <PostEmotionDetailsCounter>{count}</PostEmotionDetailsCounter>
          </PostEmotionsItem>
        );
      })}
    </PostEmotionsDetailsWrapper>
  );
};

export default PostEmotionsDetails;
export { PostEmotionsDetailsWrapper, postEmotionsDetailsTestId };
