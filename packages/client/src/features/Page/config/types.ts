import { ComponentType, LazyExoticComponent, FC } from 'react';

enum Page {
  ABOUT = '',
  EVENTS = 'events',
  CREATE_EVENTS = 'events/create',
  NETWORKS = 'networks',
  ADD_NETWORKS = 'networks/add',
  NEWS_FEED = 'news-feed',
  REPORTS = 'reports',
  NOT_FOUND = '*',
}

type PageElement = LazyExoticComponent<FC> | ComponentType | FC;

export { Page };

export type { PageElement };
