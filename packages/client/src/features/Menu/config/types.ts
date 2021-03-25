import { Page } from 'features/Page';

export type IconSrc = {
  default: string;
  active: string;
};

export type MenuItem = string;

type NotVisiblePage = Page.ADD_NETWORKS | Page.NOT_FOUND | Page.CREATE_EVENTS;

export type VisiblePages = Exclude<Page, NotVisiblePage>;

interface StylesItemsVisible {
  amount: number;
}

type PageWithIcon = Page.EVENTS | Page.NETWORKS | Page.NEWS_FEED;

export type { StylesItemsVisible, PageWithIcon };
