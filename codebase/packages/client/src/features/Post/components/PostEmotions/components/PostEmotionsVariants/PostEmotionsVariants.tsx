import React, { FC } from 'react';
import styled from 'styled-components';

import { Emoji } from '../../config/types';
import { PostEmotionIconBig } from '../PostEmotionIcons';

const PostEmotionsItem = styled.div`
  display: flex;
`;

const PostEmotionsVariantsWrapper = styled.div`
  display: flex;
  padding: 4px;
  border-radius: 19px;
  background-color: ${({ theme }) => theme.colors.background.darkest};
  & > * {
    margin-left: 8px;
    &:first-child {
      margin-left: 0;
    }
  }
`;

interface PostEmotionsVariantsProps {
  variants: Emoji[];
  onVariantClick: ({ variant }: { variant: Emoji }) => void;
}

const postEmotionsVariantsTestId = 'post-emotions-details-test-id';

const PostEmotionsVariants: FC<PostEmotionsVariantsProps> = ({
  variants,
  onVariantClick,
}) => {
  return (
    <PostEmotionsVariantsWrapper data-testid={postEmotionsVariantsTestId}>
      {variants.map((variant) => {
        const { id, image } = variant;

        return (
          <PostEmotionsItem
            key={id}
            onClick={() => onVariantClick({ variant })}
          >
            <PostEmotionIconBig iconSrc={image} />
          </PostEmotionsItem>
        );
      })}
    </PostEmotionsVariantsWrapper>
  );
};

export default PostEmotionsVariants;
export { postEmotionsVariantsTestId, PostEmotionsVariantsWrapper };
