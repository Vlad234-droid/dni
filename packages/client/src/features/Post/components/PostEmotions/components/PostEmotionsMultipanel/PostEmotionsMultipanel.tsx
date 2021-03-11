import React, { FC } from 'react';
import styled from 'styled-components';

import { Emotion } from '../../../../config/types';
import { PostEmotionIconSmall } from '../PostEmotionIcons';
import PostEmotionsDetails, {
  PostEmotionsDetailsWrapper,
} from '../PostEmotionsDetails';

const PostEmotionDetailsCounter = styled.div`
  margin-left: 8px;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.primary};
`;

const PostEmotionsItem = styled.div`
  display: flex;
  position: relative;
  & > ${PostEmotionsDetailsWrapper} {
    display: none;
    position: absolute;
    bottom: 24px;
  }
  &:hover > ${PostEmotionsDetailsWrapper} {
    display: flex;
  }
`;

const PostEmotionsMultipanelWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px 8px 8px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.background.dark};
  & > * {
    margin-left: -5px;
    &:first-child,
    &:last-child {
      margin-left: 0;
    }
  }
`;

interface PostEmotionsMultipanelProps {
  emotions: Emotion[];
}

const postEmotionsMultipanelTestId = 'post-emotions-details-test-id';

const PostEmotionsMultipanel: FC<PostEmotionsMultipanelProps> = ({
  emotions,
}) => {
  const counter = emotions.reduce((startValue, element) => {
    return startValue + element.count;
  }, 0);

  return (
    <PostEmotionsMultipanelWrapper data-testid={postEmotionsMultipanelTestId}>
      {emotions.map((emotion) => {
        const { id, image } = emotion;

        return (
          <PostEmotionsItem key={id}>
            <PostEmotionIconSmall iconSrc={image} />
            <PostEmotionsDetails emotions={[emotion]} />
          </PostEmotionsItem>
        );
      })}
      <PostEmotionsItem>
        <PostEmotionDetailsCounter>{counter}</PostEmotionDetailsCounter>
        <PostEmotionsDetails emotions={emotions} />
      </PostEmotionsItem>
    </PostEmotionsMultipanelWrapper>
  );
};

export default PostEmotionsMultipanel;
export { postEmotionsMultipanelTestId, PostEmotionsMultipanelWrapper };
