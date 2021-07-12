import { PUBLIC_URL } from 'config/constants';

export const getPath = (to: string) => (PUBLIC_URL === '/' ? `/${to}` : `${PUBLIC_URL}/${to}`);

export const getOrigin = () => {
  const origin = window.location.origin;
  return origin.endsWith('/') ? origin.slice(0, -1) : origin;
};
