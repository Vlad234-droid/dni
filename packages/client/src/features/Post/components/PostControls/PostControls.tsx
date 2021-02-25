import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { iconsSrc } from '../../config/media';
import { selectors } from '../../store/selectors';
import { color, stylesWrapperIconControl } from '../../styled';
import { TypeRenderPostControls } from '../../config/types';
import { PostEmotions, PostEmotionsBig } from '../PostEmotions';

const StyledWrapperIconControl = styled.div`
  ${stylesWrapperIconControl}
  cursor: pointer;
  background-color: ${color.darkBaseBackground};
`;

const stylesPostControls = `
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const StyledPostControls = styled.div`
  ${stylesPostControls}
  padding-top: 24px;
`;

const StyledPostControlsLeft = styled.div`
  ${stylesPostControls}
  & > * {
    margin-right: 8px;
  }
`;

const StyledPostControlsRight = styled.div`
  ${stylesPostControls}
  & > * {
    margin-left: 16px;
  }
`;

const StyledEmotionsContols = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const postControlsTestId = 'post-controls-test-id';

const PostControls: TypeRenderPostControls = ({
  item,
  onEdit,
  onDelete,
  onArchive,
  onCopyLink,
  onLikeChoice,
}) => {
  const dispatch = useDispatch();
  const emotions = useSelector(selectors.getPostEmotions);
  const [isEmojisOpened, setEmojisOpened] = useState(false);

  const onLikeClick = () => {
    setEmojisOpened(!isEmojisOpened);
  };

  return (
    <StyledPostControls data-testid={postControlsTestId}>
      <StyledPostControlsLeft>
        <StyledWrapperIconControl
          onClick={() => {
            dispatch(onArchive(item));
          }}
        >
          <img src={iconsSrc.book} />
        </StyledWrapperIconControl>
        <StyledWrapperIconControl
          onClick={() => {
            dispatch(onCopyLink(item));
          }}
        >
          <img src={iconsSrc.copy} />
        </StyledWrapperIconControl>
        <StyledEmotionsContols>
          <StyledWrapperIconControl onClick={onLikeClick}>
            <img src={iconsSrc.like} />
          </StyledWrapperIconControl>
          {isEmojisOpened && (
            <PostEmotionsBig
              onLikeClick={onLikeClick}
              onLikeChoice={onLikeChoice}
            />
          )}
          {emotions.length > 0 && <PostEmotions emotions={emotions} />}
        </StyledEmotionsContols>
      </StyledPostControlsLeft>
      <StyledPostControlsRight>
        <StyledWrapperIconControl
          onClick={() => {
            dispatch(onEdit(item));
          }}
        >
          <img src={iconsSrc.edit} />
        </StyledWrapperIconControl>
        <StyledWrapperIconControl
          onClick={() => {
            dispatch(onArchive(item));
          }}
        >
          <img src={iconsSrc.archive} />
        </StyledWrapperIconControl>
      </StyledPostControlsRight>
    </StyledPostControls>
  );
};

export default PostControls;
export { postControlsTestId };
