import { menuItemsMobile } from '../config/items';

// remove added root / to read a page
export const getPageByPath = (path: string) => path.substring(1);

//@ts-ignore
export const isHiddenItemActive = (pathname: string) =>
  !!menuItemsMobile.hidden[getPageByPath(pathname)];

export const getMoreButtonText = (pathname: string) =>
  //@ts-ignore
  isHiddenItemActive(location.pathname)
    ? menuItemsMobile.hidden[getPageByPath(pathname)]
    : 'More';
