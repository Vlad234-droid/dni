import { menuItemsMobile } from '../config/items';
import { HiddenMobilePages } from '../config/types';

export const getPageByPath = (path: string) => path.substring(1);

export const isHiddenItemActive = (pathname: string) =>
  !!menuItemsMobile.hidden[getPageByPath(pathname) as HiddenMobilePages];

export const getMoreButtonText = (pathname: string) =>
  isHiddenItemActive(pathname)
    ? menuItemsMobile.hidden[getPageByPath(pathname) as HiddenMobilePages]
    : 'More';
