import { KeyboardEvent } from 'react';

export const isBrowser = typeof window !== 'undefined';

export const isSafari = isBrowser
  ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  : false;

export const getKeyCode = (event: KeyboardEvent) => {
  const { charCode, which } = event;

  return !charCode ? which : charCode;
};
