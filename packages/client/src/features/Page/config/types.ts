import { ComponentType, LazyExoticComponent, FC } from 'react';

enum Page {
  ABOUT = '',
  EVENTS = 'events',
  NETWORKS = 'networks',
  NEWS_FEED = 'news-feed',
  REPORTS = 'reports',
  NOT_FOUND = '*',
}

type PageElement = LazyExoticComponent<FC> | ComponentType | FC;

export { Page };

export type { PageElement };
