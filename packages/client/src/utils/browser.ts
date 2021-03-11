export const isBrowser = typeof window !== 'undefined';

export const isSafari = isBrowser
  ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  : false;
