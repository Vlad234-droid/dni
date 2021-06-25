import { KEY_CODES as BEANS_KEY_CODES } from '@beans/date-input';

import { PaginationPayload, FilterPayload } from 'types/payload';
import Loading from 'types/loading';

// spread to separate files
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

export const DEFAULT_META = {
  loading: Loading.IDLE,
  error: undefined,
  count: 0,
  total: 0,
  unread: 0,
  page: 1,
  pageCount: 1,
};

export const DEFAULT_PARTICIPANTS = {
  loading: Loading.IDLE,
  error: undefined,
  data: {},
};

export const DEFAULT_PAGINATION: PaginationPayload = {
  _start: 0,
  _limit: 10,
};

export const DEFAULT_FILTERS: FilterPayload = {
  _sort: 'startDate:ASC',
};

export const LINKS = {
  signOut: 'https://www.ourtesco.com/colleague/sso/logout',
  thisIsMeSurvey: 'https://www.ourtesco.com/thisisme/office ',
  termsAndConditions: 'https://www.ourtesco.com/colleague/terms-and-conditions',
};

export const ROOT_PATH = 'diversity-and-inclusion';
