import React, { FC, useState, useRef, useMemo, MutableRefObject } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const ReadMoreReadLessValue = styled.pre<{
  isReadingMore: boolean;
  isTogglerNeeded: boolean;
  isUpdated: boolean;
}>`
  flex-grow: 1;
  overflow: ${({ isTogglerNeeded }) => isTogglerNeeded ? 'hidden' : 'auto'};
  text-overflow: ${({ isTogglerNeeded }) => isTogglerNeeded ? 'ellipsis' : 'initial'};
  white-space: ${({ isReadingMore }) => isReadingMore ? 'pre-wrap' : 'nowrap'};
  position: ${({ isUpdated }) => isUpdated ? 'static' : 'absolute'};
`;

const ReadMoreReadLessToggler = styled.span<{
  isUpdated: boolean;
}>`
  cursor: pointer;
  white-space: nowrap;
  padding-left: 8px;
  color: ${({ theme }) => theme.colors.link.base};
  opacity: ${({ isUpdated }) => isUpdated ? 1 : 0};
`;

const ReadMoreReadLessWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

interface ReadMoreReadLessProps {
  value: string;
  readMoreText: string;
  readLessText: string;
}

const readMoreReadLessTestId = 'read-more-read-less-test-id';

const ReadMoreReadLess: FC<ReadMoreReadLessProps> = ({
  value,
  readMoreText,
  readLessText,
}) => {
  const valueRef = useRef() as MutableRefObject<HTMLPreElement>;
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [isReadingMore, setReadingMore] = useState(false);
  const [isTogglerNeeded, setTogglerNeeded] = useState(true);
  const [isUpdated, setUpdated] = useState(false);
  const [valueWidth, setValueWidth] = useState(0);

  const onTextAnalyze = () => {
    if (!containerRef.current || isReadingMore) {
      return;
    }

    if (valueWidth > containerRef.current.clientWidth) {
      setTogglerNeeded(true);
    } else {
      setTogglerNeeded(false);
    }
  };

  useEffect(() => {
    if (isUpdated) {
      window.addEventListener('resize', onTextAnalyze);
    } else {
      window.removeEventListener('resize', onTextAnalyze);
      setValueWidth(valueRef.current.offsetWidth);
      setUpdated(true);
    }
    
    return () => {
      window.removeEventListener('resize', onTextAnalyze);
    };
    
  }, [value, isUpdated]);

  useMemo(onTextAnalyze, [valueWidth]);

  return (
    <ReadMoreReadLessWrapper
      ref={containerRef}
      data-testid={readMoreReadLessTestId}
    >
      <ReadMoreReadLessValue
        ref={valueRef}
        isUpdated={isUpdated}
        isReadingMore={isReadingMore}
        isTogglerNeeded={isTogglerNeeded}
      >
        {value}
        {isReadingMore && (
          <ReadMoreReadLessToggler
            isUpdated={isUpdated}
            onClick={() => setReadingMore(false)}
          >
            {readLessText}
          </ReadMoreReadLessToggler>
        )}
      </ReadMoreReadLessValue>
      {!isReadingMore && isTogglerNeeded && (
        <ReadMoreReadLessToggler
          isUpdated={isUpdated}
          onClick={() => setReadingMore(true)}
        >
          {readMoreText}
        </ReadMoreReadLessToggler>
      )}
    </ReadMoreReadLessWrapper>
  );
};

export default ReadMoreReadLess;
export { readMoreReadLessTestId };
