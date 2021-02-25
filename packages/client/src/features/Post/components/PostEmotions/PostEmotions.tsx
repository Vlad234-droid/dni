import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
  TypeRenderPostEmotions,
  TypeRenderPostEmotionsBig,
} from '../../config/types';
import { emotionsList } from '../../config/media';
import {
  color,
  stylesTextMidBluePrimarytNormal,
  stylesWrapperIconEmotion,
} from '../../styled';

const StyledEmotionCounter = styled.div`
  ${stylesTextMidBluePrimarytNormal}
  padding: 0 4px 0 8px;
`;

const StyledWrapperIconEmotion = styled.div`
  ${stylesWrapperIconEmotion}
  width: 24px;
  height: 24px;
`;

const StyledWrapperIconEmotionBig = styled.div`
  ${stylesWrapperIconEmotion}
  width: 32px;
  height: 32px;
  margin-left: 8px;
  &:first-child {
    margin-left: 0;
  }
`;

const stylesEmotionBoxHidden = `
  position: absolute;
  border-radius: 24px;
  left: 24px;
  padding: 8px;
  display: none;
  background-color: ${color.darkBaseBackground};
  box-shadow: 0 2px 4px 0 ${color.innerPostBorder2};
`;

const StyledEmotionBoxHidden = styled.div`
  ${stylesEmotionBoxHidden}
  top: -32px;
`;

const StyledEmotionTotalBoxHidden = styled.div`
  ${stylesEmotionBoxHidden}
  bottom: 16px;
  flex-direction: column;
`;

const StyledEmotionCounterBox = styled.div`
  position: relative;
  &:hover > ${StyledEmotionTotalBoxHidden} {
    display: flex;
  }
`;

const StyledEmotion = styled.div`
  position: relative;
  &:hover > ${StyledEmotionBoxHidden} {
    display: flex;
  }
  margin-left: -5px;
  &:first-child {
    margin-left: 0;
  }
`;

const StyledEmotionTotal = styled.div`
  display: flex;
  padding: 4px;
`;

const stylesEmotions = `
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: 24px;
  background-color: ${color.darkBaseBackground};
`;

const StyledEmotions = styled.div`
  ${stylesEmotions}
  min-height: 40px;
  padding: 8px;
  margin-left: 8px;
  cursor: pointer;
`;

const StyledEmotionsBig = styled.div`
  ${stylesEmotions}
  top: 0;
  left: 0;
  position: absolute;
  cursor: pointer;
  padding: 4px;
  z-index: 1;
`;

const postEmotionsTestId = 'post-emotions-test-id';

const PostEmotions: TypeRenderPostEmotions = ({ emotions }) => {
  const counterValue = emotions.reduce((startValue, element) => {
    return startValue + element.count;
  }, 0);

  return (
    <StyledEmotions data-testid={postEmotionsTestId}>
      {emotions.map(({ name, image, count }) => (
        <StyledEmotion key={name}>
          <StyledWrapperIconEmotion>
            <img src={image} alt={name} />
          </StyledWrapperIconEmotion>
          <StyledEmotionBoxHidden>
            <StyledWrapperIconEmotion>
              <img src={image} alt={name} />
            </StyledWrapperIconEmotion>
            <StyledEmotionCounter>{count}</StyledEmotionCounter>
          </StyledEmotionBoxHidden>
        </StyledEmotion>
      ))}
      <StyledEmotionCounterBox>
        <StyledEmotionCounter>{counterValue}</StyledEmotionCounter>
        <StyledEmotionTotalBoxHidden>
          {emotions.map(({ name, image, count }) => (
            <StyledEmotionTotal key={name}>
              <StyledWrapperIconEmotion>
                <img src={image} alt={name} />
              </StyledWrapperIconEmotion>
              <StyledEmotionCounter>{count}</StyledEmotionCounter>
            </StyledEmotionTotal>
          ))}
        </StyledEmotionTotalBoxHidden>
      </StyledEmotionCounterBox>
    </StyledEmotions>
  );
};

const postEmotionsBigTestId = 'post-emotions-big-test-id';

const PostEmotionsBig: TypeRenderPostEmotionsBig = ({
  onLikeClick,
  onLikeChoice,
}) => {
  const dispatch = useDispatch();

  return (
    <StyledEmotionsBig data-testid={postEmotionsBigTestId}>
      {emotionsList.map((emoji) => (
        <StyledWrapperIconEmotionBig
          key={emoji.name}
          onClick={() => {
            onLikeClick();
            dispatch(onLikeChoice(emoji));
          }}
        >
          <img src={emoji.image} alt={emoji.name} />
        </StyledWrapperIconEmotionBig>
      ))}
    </StyledEmotionsBig>
  );
};

export {
  PostEmotions,
  postEmotionsTestId,
  PostEmotionsBig,
  postEmotionsBigTestId,
};
