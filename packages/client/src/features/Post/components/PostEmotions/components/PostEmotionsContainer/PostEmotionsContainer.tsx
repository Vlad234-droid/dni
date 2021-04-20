import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { Emoji, Emotion } from '../../config/types';
import { variants } from '../../config/variants';
import { iconsSrc } from '../../config/media';
import PostEmotionsMultipanel, {
  PostEmotionsMultipanelWrapper,
} from '../PostEmotionsMultipanel';
import PostEmotionsVariants, {
  PostEmotionsVariantsWrapper,
} from '../PostEmotionsVariants';

const PostEmotionToggleButton = styled.div<{
  pressed: boolean;
}>`
  width: 40px;
  height: 40px;
  cursor: pointer;
  overflow: hidden;
  border-radius: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${({ pressed }) =>
    pressed ? iconsSrc.likePressed : iconsSrc.like});
  background-color: ${({ pressed, theme }) =>
    pressed ? theme.colors.primary : theme.colors.background.dark}};
`;

const PostEmotionToggleZone = styled.div`
  display: flex;
  position: relative;
  & > ${PostEmotionsVariantsWrapper} {
    position: absolute;
    display: none;
    z-index: 1;
    left: 0;
  }
  &:hover > ${PostEmotionsVariantsWrapper} {
    display: flex;
  }
`;

const PostEmotionsWrapper = styled.div`
  display: flex;
  & > ${PostEmotionsMultipanelWrapper} {
    margin-left: 8px;
  }
`;

interface PostEmotionsProps {
  emotions: Emotion[];
  onEmotionClick: ({ variant }: { variant: Emoji }) => void;
  onPostUnlike: () => void;
}

const postEmotionsTestId = 'post-emotions-test-id';

const PostEmotions: FC<PostEmotionsProps> = ({
  emotions,
  onEmotionClick,
  onPostUnlike,
}) => {
  const [isPressed, setPressed] = useState(emotions.length > 0 || false);

  return (
    <PostEmotionsWrapper data-testid={postEmotionsTestId}>
      <PostEmotionToggleZone>
        <PostEmotionToggleButton
          pressed={isPressed}
          onClick={() => {
            if (isPressed) {
              setPressed(false);
              onPostUnlike();
            }
          }}
        />
        {!isPressed && (
          <PostEmotionsVariants
            variants={variants}
            onVariantClick={({ variant }) => {
              setPressed(true);
              onEmotionClick({ variant });
            }}
          />
        )}
      </PostEmotionToggleZone>
      {emotions.length > 0 && <PostEmotionsMultipanel emotions={emotions} />}
    </PostEmotionsWrapper>
  );
};

export default PostEmotions;
export { postEmotionsTestId };
