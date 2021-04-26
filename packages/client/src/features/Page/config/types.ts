import { ComponentType, LazyExoticComponent, FC } from 'react';
import List from '../../List';

enum Page {
  ABOUT = '',
  EVENTS = 'events',
  EVENT = 'events/:id',
  NETWORKS = 'networks',
  NETWORK = 'networks/:id',
  NETWORK_NEWS = 'network-news',
  REPORTS = 'reports',
  PROFILE = 'profile',
  NOT_FOUND = '*',
}

type PageElement = LazyExoticComponent<FC<any>> | ComponentType | FC<any>;

export { Page };

export type { PageElement };
