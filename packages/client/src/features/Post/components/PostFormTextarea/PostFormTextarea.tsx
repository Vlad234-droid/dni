import React, { FC, useState, useEffect, createRef, useMemo } from 'react';

import {
  PostFormTextArea,
  PostFormTextAreaToolTip,
  PostFormTextAreaWrapper,
} from './styled';

interface PostFormTextareaProps {
  toolTipText: string;
  stateValue: string;
  defaultValue: string;
  onTextChange: ({ value }: { value: string }) => void;
}

const postFormTextareaTestId = 'post-form-textarea-test-id';

const PostFormTextarea: FC<PostFormTextareaProps> = ({
  toolTipText,
  stateValue,
  defaultValue,
  onTextChange,
}) => {
  const [value, setValue] = useState(stateValue || defaultValue);
  const [height, setHeight] = useState(0);
  const [isFocused, setFocused] = useState(false);

  const textareaRef = createRef<HTMLTextAreaElement>();

  useMemo(() => {
    if (!stateValue && !isFocused) {
      setValue(defaultValue);
    }
  }, [stateValue]);

  useEffect(() => {
    const { current } = textareaRef;

    if (current) {
      const { scrollHeight, offsetHeight } = current;

      setHeight(
        scrollHeight >= offsetHeight ? scrollHeight : scrollHeight - 20,
      );
    }
  });

  return (
    <PostFormTextAreaWrapper data-testid={postFormTextareaTestId}>
      <PostFormTextArea
        ref={textareaRef}
        value={value}
        height={height}
        onChange={(event) => {
          const { value, scrollHeight, offsetHeight } = event.target;

          onTextChange({ value });

          setValue(value);
          setHeight(
            scrollHeight >= offsetHeight ? scrollHeight : scrollHeight - 20,
          );
        }}
        onFocus={(event) => {
          const { value } = event.target;
          const newValue = value !== ('' || defaultValue) ? value : '';

          setValue(newValue);
          setFocused(true);
        }}
        onBlur={(event) => {
          const { value } = event.target;

          if (['', defaultValue].includes(value)) {
            setValue(defaultValue);
          }
          setFocused(false);
        }}
      />
      {isFocused && (
        <PostFormTextAreaToolTip
          isVisible={value === '' || value === defaultValue}
        >
          {toolTipText}
        </PostFormTextAreaToolTip>
      )}
    </PostFormTextAreaWrapper>
  );
};

export default PostFormTextarea;
export { postFormTextareaTestId };
