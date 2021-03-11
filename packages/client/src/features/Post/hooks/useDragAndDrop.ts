import { useState, createRef, useMemo, DragEvent } from 'react';

import { resetMouseEvent } from '../utils';

const useDragAndDrop = ({
  onFilesDrop,
}: {
  onFilesDrop: (event: DragEvent) => void;
}) => {
  const dropZoneRef = createRef<HTMLDivElement>();

  const [isDropZoneVisible, setDropZoneVisible] = useState(false);
  const [isDropZoneActive, setDropZoneActive] = useState(false);
  const [dragAndDropDepth, setDragAndDropDepth] = useState(0);

  const onDragEnter = (event: DragEvent) => {
    resetMouseEvent(event);
    setDropZoneVisible(true);
    setDragAndDropDepth(dragAndDropDepth + 1);

    if (event.target === dropZoneRef.current) {
      setDropZoneActive(true);
    }
  };

  const onDrop = (event: DragEvent) => {
    resetMouseEvent(event);
    setDragAndDropDepth(dragAndDropDepth - 1);

    if (event.target === dropZoneRef.current) {
      onFilesDrop(event);
    }
  };

  const onDragLeave = (event: DragEvent) => {
    resetMouseEvent(event);
    setDragAndDropDepth(dragAndDropDepth - 1);
  };

  const onDropZoneDragLeave = () => {
    setDropZoneActive(false);
  };

  const onMemo = () => {
    if (dragAndDropDepth === 0) {
      setDropZoneVisible(false);
    }
  };

  const dragZoneProps = {
    onDragOver: resetMouseEvent,
    onDragEnter,
    onDragLeave,
    onDrop,
  };

  useMemo(onMemo, [dragAndDropDepth]);

  return {
    dropZoneRef,
    dragZoneProps,
    isDropZoneVisible,
    isDropZoneActive,
    onDropZoneDragLeave,
  };
};

export { useDragAndDrop };
