import { ROOT_PATH } from 'config/constants';

export const getRootPath = () =>
  window.location.pathname.includes(ROOT_PATH) ? process.env.PUBLIC_URL : '/';
