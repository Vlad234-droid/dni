import { useRef, useEffect, RefObject, SyntheticEvent } from 'react';

function useEventListener<
  T extends HTMLElement = HTMLDivElement,
  U extends SyntheticEvent = SyntheticEvent
>(eventName: string, handler: (event: U) => void, element?: RefObject<T>) {
  const savedHandler = useRef<(event: U) => void>();

  useEffect(() => {
    const targetElement: T | Window = element?.current || window;

    if (!(targetElement && targetElement.addEventListener)) return;

    if (savedHandler.current !== handler) {
      savedHandler.current = handler;
    }

    const eventListener: EventListenerOrEventListenerObject = (event) => {
      if (Boolean(savedHandler?.current) && savedHandler.current) {
        return savedHandler.current((event as unknown) as U);
      }
    };

    targetElement.addEventListener(eventName, eventListener);

    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element, handler]);
}

export default useEventListener;
