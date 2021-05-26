import { Page } from 'features/Page';

export type IconSrc = {
  default: string;
  active: string;
};

export type MenuItem = string;

type NotVisiblePage = Page.NOT_FOUND;

export type VisiblePages = Exclude<Page, NotVisiblePage>;

interface StylesItemsVisible {
  amount: number;
}

type PageWithIcon = Page.EVENTS | Page.NETWORKS | Page.NETWORK_NEWS;
type HiddenMobilePages = Page.ABOUT | Page.REPORTS;

export type { StylesItemsVisible, PageWithIcon, HiddenMobilePages };
