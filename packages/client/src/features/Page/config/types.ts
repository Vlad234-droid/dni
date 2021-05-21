import { ComponentType, LazyExoticComponent, FC } from 'react';

enum Page {
  ABOUT = '',
  EVENTS = 'events',
  EVENT = 'events/:id',
  NETWORKS = 'networks',
  NETWORK = 'networks/:id',
  NETWORK_NEWS = 'network-news',
  NETWORK_POST = 'network-news/:id',
  REPORTS = 'reports',
  PROFILE = 'profile',
  NOT_FOUND = '404',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PageElement = LazyExoticComponent<FC<any>> | ComponentType | FC<any>;

export { Page };

export type { PageElement };
