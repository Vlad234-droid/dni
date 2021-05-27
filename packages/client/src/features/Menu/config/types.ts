import { Page } from 'features/Page';

export type MenuItem = string;

type NotVisiblePage = Page.NOT_FOUND;

export type VisiblePages = Exclude<Page, NotVisiblePage>;

interface StylesItemsVisible {
  amount: number;
}

type PageWithIcon =
  | Page.EVENTS
  | Page.NETWORKS
  | Page.NETWORK_NEWS
  | Page.HOME
  | Page.ABOUT;

export type { StylesItemsVisible, PageWithIcon };
