import { KEY_CODES as BEANS_KEY_CODES } from '@beans/date-input';

export enum ViewportSize {
  PHONE = 320,
  LARGE_PHONE = 504,
  TABLET = 756,
  LARGE_TABLET = 768,
  SMALL_DESKTOP = 1025,
  DESKTOP = 1260,
  LARGE_DESKTOP = 1920,
}

export const KEY_CODES: Record<string, number> = {
  ...BEANS_KEY_CODES,
  upArrow: 38,
  downArrow: 40,
};
