import { ComponentType, LazyExoticComponent, FC } from 'react';

enum Page {
  ABOUT = '',
  EVENTS = 'events',
  NETWORKS = 'networks',
  NETWORK = 'networks/:id',
  NEWS_FEED = 'news-feed',
  REPORTS = 'reports',
  NOT_FOUND = '*',
}

type PageElement = LazyExoticComponent<FC<any>> | ComponentType | FC<any>;

export { Page };

export type { PageElement };
