import styled from 'styled-components';

import { iconsSrc } from '../../../config/media';

const PostSelectValue = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  max-width: fit-content;
`;

const PostSelectValueText = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: bold;
  color: #333333;
  margin: 0 14px 0 6px;
`;

const PostSelectValueArror = styled.div`
  width: 14px;
  height: 8px;
  background-repeat: no-repeat;
  background-image: url(${iconsSrc.selectArrow});
`;

const PostSelectOptionAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 100%;
`;

const PostSelectOptionValue = styled.div`
  margin-left: 4px;
`;

const PostSelectOption = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  cursor: pointer;
  color: #00539f;
  white-space: nowrap;
  border-top: 1px solid #cccccc;
  &:nth-child(2) {
    border-top: 0;
  }
`;

const PostSelectOptionsTitle = styled.div`
  color: #666666;
  padding: 10px 12px;
`;

const PostSelectOptions = styled.div`
  top: 0;
  position: absolute;
  max-width: 228px;
  font-size: 14px;
  line-height: 22px;
  background-color: #ffffff;
  box-shadow: 0 1px 6px 0 #cccccc;
  z-index: 3;
`;

const PostSelectWrapper = styled.div`
  position: relative;
`;

export {
  PostSelectValue,
  PostSelectValueText,
  PostSelectValueArror,
  PostSelectOptionAvatar,
  PostSelectOptionValue,
  PostSelectOption,
  PostSelectOptionsTitle,
  PostSelectOptions,
  PostSelectWrapper,
};
