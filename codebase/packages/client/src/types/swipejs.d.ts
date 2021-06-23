declare module 'swipejs/react' {
  import React, { Ref } from 'react';

  export type SwipeItemProps = {
    className?: string;
    onClick?: () => void;
  };

  export const SwipeItem: React.FC<SwipeItemProps>;

  export type SwipeInstance = {
    instance: {
      prev: () => void;
      next: () => void;
      stop: () => void;
      enable: () => void;
      slide: (index: number) => void;
    };
  };

  export type SwipeProps = {
    /** custom class name for swipe container element */
    className?: string;

    /** custom styles for swipe */
    style?: React.CSSProperties;

    /** index position at which Swipe should start. */
    startSlide?: number;

    /** speed of prev and next transitions in milliseconds. */
    speed?: number;

    /** when specified, start an auto-playing slideshow (time in milliseconds between slide change). */
    auto?: number;

    /** enables dragging on desktop */
    draggable?: boolean;

    /** create an infinite feel with no endpoints */
    continuous?: boolean;

    /** auto restart slideshow after user's touch event or next/prev calls. */
    autoRestart?: boolean;

    /** prevent any touch events on this container from scrolling the page. */
    disableScroll?: boolean;

    /** stop event propagation. */
    stopPropagation?: boolean;

    /** runs at slide change. */
    callback?: (index: number, currentElement: HTMLElement, direction: 1 | -1) => void;

    /** runs at the end of a slide transition. */
    transitionEnd?: (index: number, currentElement: HTMLElement) => void;

    ref?: Ref<SwipeInstance>;

    autoHeight?: boolean;

    height?: string;

    current?: SwipeInstance;
  };

  const Swipe: React.FC<SwipeProps>;

  export default Swipe;
}
