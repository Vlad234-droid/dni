import { menuItemsMobile } from '../config/items';

export const getPageByPath = (path: string) => path.substring(1);

export const isHiddenItemActive = (pathname: string) =>
  //@ts-ignore
  !!menuItemsMobile.hidden[getPageByPath(pathname)];

export const getMoreButtonText = (pathname: string) =>
  isHiddenItemActive(location.pathname)
    ? //@ts-ignore
      menuItemsMobile.hidden[getPageByPath(pathname)]
    : 'More';
