import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import {
  TypeUser,
  TypeRenderPublisher,
  TypeRenderCustomSelect,
} from '../../config/types';
import { selectors } from '../../store/selectors';
import { iconsSrc } from '../../config/media';
import {
  color,
  stylesWrapperImage,
  stylesTextMidDarkBaseBold,
  stylesTextMinBluePrimarytNormal,
  stylesTextMinBaseInfoTextNormal,
  stylesWrapperAvatar,
} from '../../styled';

const StyledCustomSelectMenuTitle = styled.div`
  ${stylesTextMinBaseInfoTextNormal}
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: 4px 12px;
  box-sizing: border-box;
`;

const StyledCustomSelectMenu = styled.div`
  min-width: 228px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: ${color.whitePrimary};
  box-shadow: 0 2px 4px 0 ${color.innerPostBorder2};
`;

const StyledCustomSelectCaption = styled.div`
  display: flex;
  align-items: center;
  max-width: max-content;
  cursor: pointer;
`;

const StyledCustomSelectValue = styled.div`
  ${stylesTextMidDarkBaseBold}
`;

const StyledWrapperIconArrow = styled.div`
  ${stylesWrapperImage}
  margin-left: 12px;
`;

const StyledCustomSelectOption = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: 4px 12px;
  box-sizing: border-box;
  border-bottom: 1px solid ${color.innerPostBorder2};
  &:last-child {
    border-bottom: 0;
  }
`;

const StyledWrapperOptionAvatar = styled.div`
  ${stylesWrapperAvatar};
  width: 32px;
  height: 32px;
`;

const StyledCustomSelectOptionValue = styled.div`
  ${stylesTextMinBluePrimarytNormal}
  margin-left: 8px;
`;

const StyledCustomSelect = styled.div`
  position: relative;
`;

const Publisher: TypeRenderPublisher = ({ publisher, onOptionPick }) => (
  <StyledCustomSelectOption
    key={publisher.name}
    onClick={(event) => {
      onOptionPick(event, publisher);
    }}
  >
    <StyledWrapperOptionAvatar>
      <img src={publisher.avatarSrc} alt={publisher.name} />
    </StyledWrapperOptionAvatar>
    <StyledCustomSelectOptionValue>
      {publisher.name}
    </StyledCustomSelectOptionValue>
  </StyledCustomSelectOption>
);

const postCustomSelectTestId = 'post-custom-select-test-id';

const PostCustomSelect: TypeRenderCustomSelect = ({
  onOptionPick,
  onMenuToggle,
}) => {
  const isMenuOpened = useSelector(selectors.getIsMenuOpened);
  const publisherName = useSelector(selectors.getPostPublisherName);
  const publishersList = useSelector(selectors.getPublishersList);

  const dispatch = useDispatch();

  return (
    <StyledCustomSelect data-testid={postCustomSelectTestId}>
      <StyledCustomSelectCaption
        onClick={(event) => {
          event.stopPropagation();
          dispatch(onMenuToggle());
        }}
      >
        <StyledCustomSelectValue>{publisherName}</StyledCustomSelectValue>
        <StyledWrapperIconArrow>
          <img src={iconsSrc.selectArrow} alt='select-arrow' />
        </StyledWrapperIconArrow>
      </StyledCustomSelectCaption>
      {isMenuOpened && (
        <StyledCustomSelectMenu>
          <StyledCustomSelectMenuTitle>Publish as</StyledCustomSelectMenuTitle>
          {publishersList.map((publisher: TypeUser) => (
            <Publisher
              key={publisher.name}
              publisher={publisher}
              onOptionPick={() => {
                dispatch(onOptionPick(publisher));
              }}
            />
          ))}
        </StyledCustomSelectMenu>
      )}
    </StyledCustomSelect>
  );
};

export default PostCustomSelect;
export { postCustomSelectTestId };
