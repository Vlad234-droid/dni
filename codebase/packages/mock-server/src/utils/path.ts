import config from '../config';

export const buildFullUrl = (path: string) => {
  return `http://localhost:${config.port}/${path}`;
};
