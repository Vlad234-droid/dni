import { ComponentType, LazyExoticComponent, FC } from 'react';

enum Page {
  ABOUT = '',
  EVENTS = 'events',
  NETWORKS = 'networks',
  ADD_NETWORKS = 'networks/add',
  NEWS_FEED = 'news-feed',
  NOT_FOUND = '*',
  REPORTS = 'reports',
}

type PageElement = LazyExoticComponent<FC> | ComponentType | FC;

export { Page };

export type { PageElement };
