import { ComponentType, LazyExoticComponent, FC } from 'react';

enum Page {
  ABOUT = '',
  DASHBOARD = 'dashboard',
  EVENTS = 'events',
  NETWORKS = 'networks',
  NEWS_FEED = 'news-feed',
  NOT_FOUND = '*',
  PROFILE = 'profile',
  REPORTS = 'reports',
  SURVEYS = 'surveys',
  USERS = 'users-and-permissions',
}

type PageElement = LazyExoticComponent<FC> | ComponentType | FC;

export { Page };

export type { PageElement };
