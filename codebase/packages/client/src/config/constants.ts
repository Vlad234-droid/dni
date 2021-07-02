import { KEY_CODES as BEANS_KEY_CODES } from '@beans/date-input';

import { PaginationPayload, FilterPayload } from 'types/payload';
import Loading from 'types/loading';

export const PUBLIC_URL = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '/';

export const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '/api';

export const WS_URL = process.env.REACT_APP_WS_URL ? process.env.REACT_APP_WS_URL : '/socket.io';

export const OURTESCO_URL = process.env.REACT_APP_OURTESCO_URL
  ? process.env.REACT_APP_OURTESCO_URL
  : 'https://www.ourtesco.com';

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
  signOut: `${OURTESCO_URL}/colleague/sso/logout`,
  thisIsMeSurvey: `${OURTESCO_URL}/thisisme/office`,
  termsAndConditions: `${OURTESCO_URL}/colleague/terms-and-conditions`,
  privacyPolicy: 'https://colleague-help.ourtesco.com/hc/en-us/articles/360001354803-Colleague-Data-Privacy-Full-Policy-and-Supporting-Documents'
};
