import { ComponentType, LazyExoticComponent, FC } from 'react';

enum Page {
  ABOUT = '',
  EVENTS = 'events',
  EVENT = 'events/:id',
  NETWORKS = 'networks',
  NETWORK = 'networks/:id',
  NEWS_FEED = 'news-feed',
  REPORTS = 'reports',
  PROFILE = 'profile',
  NOT_FOUND = '*',
}

type PageElement = LazyExoticComponent<FC<any>> | ComponentType | FC<any>;

export { Page };

export type { PageElement };
