import { Page } from 'features/Page';

type PageWithIcon =
  | Page.EVENTS
  | Page.NETWORKS
  | Page.NETWORK_NEWS
  | Page.HOME
  | Page.ABOUT;

export type { PageWithIcon };
