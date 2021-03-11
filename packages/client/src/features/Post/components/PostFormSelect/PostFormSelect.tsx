import React, { FC, useState } from 'react';

import { User } from '../../config/types';
import {
  PostSelectValue,
  PostSelectValueText,
  PostSelectValueArror,
  PostSelectOptionAvatar,
  PostSelectOptionValue,
  PostSelectOption,
  PostSelectOptionsTitle,
  PostSelectOptions,
  PostSelectWrapper,
} from './styled';

interface PostSelectProps {
  value: User;
  options: User[];
  optionsTitle: string;
  onOptionClick: (publisher: User) => void;
}

const postSelectTestId = 'post-select-test-id';

const PostSelect: FC<PostSelectProps> = ({
  value,
  options,
  optionsTitle,
  onOptionClick,
}) => {
  const [isOptionsOpened, setOptionsOpened] = useState(false);

  const onOptionsToggle = () => {
    setOptionsOpened(!isOptionsOpened);
  };

  return (
    <PostSelectWrapper data-testid={postSelectTestId}>
      <PostSelectValue onClick={onOptionsToggle}>
        <PostSelectValueText>{value.name}</PostSelectValueText>
        <PostSelectValueArror />
      </PostSelectValue>
      {isOptionsOpened && (
        <PostSelectOptions>
          <PostSelectOptionsTitle onClick={onOptionsToggle}>
            {optionsTitle}
          </PostSelectOptionsTitle>
          {options.map(({ name, avatarSrc }) => {
            return (
              <PostSelectOption
                key={name}
                onClick={() => {
                  onOptionsToggle();
                  onOptionClick({ name, avatarSrc });
                }}
              >
                <PostSelectOptionAvatar src={avatarSrc} />
                <PostSelectOptionValue>{name}</PostSelectOptionValue>
              </PostSelectOption>
            );
          })}
        </PostSelectOptions>
      )}
    </PostSelectWrapper>
  );
};

export default PostSelect;
export { postSelectTestId };
