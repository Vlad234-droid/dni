import React, { FC, useEffect, useState, useCallback, useRef } from 'react';
import { multiLineEllipse } from '@beans/helpers';
import { Signpost } from '@beans/typography';

type Props = {
  ellipsisLastLineBuffer?: number;
  ellipse?: boolean;
  maxLines?: number;
  children: string;
  windowSize?: {
    height: number;
    width: number;
  };
};

const Description: FC<Props> = ({
  children,
  windowSize = {},
  ellipsisLastLineBuffer = 0.5,
  ellipse = false,
  maxLines = 2,
}) => {
  const [description, setDescription] = useState<JSX.Element>();
  const descriptionRef = useRef<JSX.Element>();
  const { width = 0, height = 0 } = windowSize;

  const ellipseDescription = useCallback(() => {
    if (ellipse && descriptionRef && descriptionRef.current) {
      const description = multiLineEllipse(
        children,
        (descriptionRef.current as unknown) as HTMLElement,
        {
          lineWidthbuffer: ellipsisLastLineBuffer,
          maxLines,
        },
      );
      setDescription(description);
    }
  }, [ellipse, ellipsisLastLineBuffer, maxLines, children]);

  useEffect(() => {
    ellipseDescription();
  }, [ellipseDescription, width, height]);

  return (
    <Signpost
      aria-label={children}
      domRef={(element: JSX.Element) => {
        if (element) {
          descriptionRef.current = element;
        }
      }}
    >
      {description}
    </Signpost>
  );
};

export default Description;
